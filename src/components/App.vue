<template>
  <div id="app">
    <transition name="fade">
      <div class="screen screen-0" v-if="!room">
        <img class="logo" src="@/assets/logo-1.svg" />

        <div class="pageContent" style="margin-top: 150px">
          <ButtonPrimary @click="joinRoom()">Играть</ButtonPrimary>
          <ButtonSecondary>Играть с друзьями</ButtonSecondary>
        </div>

        <Rating v-if="false">
          <RatingTabs />
          <RatingLine v-for="i in 4" :key="i" />
        </Rating>
      </div>
    </transition>

    <transition name="fade">
      <div class="screen screen-1" v-if="phase.type === 'AwaitForStart'">
        <img class="logo" src="@/assets/logo-1.svg" />

        <div class="pageContent">
          <ButtonPrimary>Ждем других игроков</ButtonPrimary>
        </div>

        <Rating>
          <RatingLine v-for="user in room.players" :key="user.id" :data="user" />
        </Rating>

        <Timer :data="(phase.timeEnd - new Date().getTime())"></Timer>
      </div>
    </transition>

    <transition name="fade">
      <div class="screen screen-2" v-if="phase.type === 'ChooseImage'">
      <Header />

      <Users :players="players.players" :me="players.me">
        <Timer :data="(phase.timeEnd - new Date().getTime())"></Timer>
      </Users>

      <Hint>
        Выберите карту, подходящую фразе
      </Hint>

      <DropZone v-if="room.phrase" :type="'choose'">{{ room.phrase.text }}</DropZone>

      <Hand :cards="players.me.cards" />
    </div>
    </transition>

    <transition name="fade">
      <div class="screen screen-3" v-if="phase.type === 'Vote'">
      <Header />

      <Users :players="players.players" :me="players.me">
        <Timer :data="(phase.timeEnd - new Date().getTime())"></Timer>
      </Users>

      <Hint>Проголосуйте за лучший ответ</Hint>

      <DropZone v-if="room.phrase" :type="'vote'">{{ room.phrase.text }}</DropZone>

      <Hand :cards="players.players.map(player => ({...player.choice, userId: player.id}))" />
    </div>
    </transition>

    <transition name="fade">
      <div class="screen screen-4" v-if="phase.type === 'VoteResult' || phase.type === 'EndGamePlayers' || phase.type === 'EndGameScore'">
      <Header />

      <Phrase v-if="room.phrase">{{ room.phrase.text }}</Phrase>

      <Results :players="room.players" />

      <Timer :data="(phase.timeEnd - new Date().getTime())"></Timer>
    </div>
    </transition>

    <div style="display: none">
      <button @click="start()">Start</button>


      <button @click="getPhase()">&laquo; Получить текущую фазу</button>

      <button @click="joinRoom()">&raquo; Найти комнату</button>
      <button @click="chooseImage(phraseId, imageUrl)">&raquo; Выбрать картинку</button>
      <button @click="vote(userId, phraseId)">&raquo; Сделать ход</button>
      <button @click="leaveRoom()">&raquo; Покинуть комнату</button>
    </div>
  </div>
</template>

<script>
  import { bus } from "../bus";
  import { mapGetters } from 'vuex';

  import ButtonPrimary from './components/ButtonPrimary';
  import ButtonSecondary from './components/ButtonSecondary';
  import Rating from './components/Rating';
  import RatingTabs from './components/RatingTabs';
  import RatingLine from './components/RatingLine';

  import Header from './components/Header';
  import Users from './components/Users';
  import Timer from './components/Timer';
  import Hint from './components/Hint';
  import DropZone from './components/DropZone';
  import Hand from './components/Hand';

  import Phrase from './components/Phrase';
  import Results from './components/Results';

  export default {
    name: 'App',
    components: {
      ButtonPrimary,
      ButtonSecondary,
      Rating,
      RatingTabs,
      RatingLine,
      Header,
      Users,
      Timer,
      Hint,
      DropZone,
      Hand,
      Phrase,
      Results
    },
    computed: {
      ...mapGetters({
        room: 'game/room',
        phase: 'game/phase',
        user: 'user/data',
        vkUser: 'user/vkData'
      }),

      players() {
        if (!this.room) return [];

        return this.room.players.reduce((acc, user) => {
          if (user.id != this.$store.state.user.data.id) {
            acc.players.push(user);
          } else {
            acc.me = user;
          }
          return acc;
        }, { players: [], me: {} });
      }
    },
    data: () => ({
      step: 0
    }),
    methods: {
      start() {
        if (this.timer) this.stop();

        this.timer = setInterval(async () => {
          await this.$store.dispatch('game/getState');
          if (!this.room) this.stop();
        }, 1000);
      },
      stop() {
        clearInterval(this.timer);
      },

      async getPhase() {
        await this.$store.dispatch('game/getState');
        this.start();
      },
      async joinRoom(hash = '', gameType = 'Cards', isPrivate = false) {
        await this.$store.dispatch('game/joinRoom', { roomId: hash, gameType, isPrivate });
        if (this.room) this.start();
        else this.stop();
      },
      async chooseImage(phraseId, imageUrl) {
        await this.$store.dispatch('game/chooseImage', { phraseId, imageUrl });
        this.start();
      },
      async vote(userId, phraseId) {
        await this.$store.dispatch('game/vote', {votes : [{ userId, phraseId }]});
        this.start();
      },
      async leaveRoom() {
        await this.$store.dispatch('game/leaveRoom');
        this.start();
      },

      mouseMoveHandler(e) {
        bus.$emit('mouseMove', e);
      },
      mouseUpHandler(e) {
        bus.$emit('mouseUp', e);
      }
    },
    mounted() {
      bus.$on('init', this.start);

      document.addEventListener('mousemove', this.mouseMoveHandler);
      document.addEventListener('mouseup',   this.mouseUpHandler);

      document.addEventListener('touchmove', this.mouseMoveHandler);
      document.addEventListener('touchend',   this.mouseUpHandler);
      document.addEventListener('touchcancel',   this.mouseUpHandler);
    },
    beforeDestroy() {
      bus.$off('init', this.start);

      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup',   this.mouseUpHandler);

      document.removeEventListener('touchmove', this.mouseMoveHandler);
      document.removeEventListener('touchend',   this.mouseUpHandler);
      document.removeEventListener('touchcancel',   this.mouseUpHandler);
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,300&display=swap');

  :root {
    --primary: #FA6A0A;
    --secondary: #200E29;
    --light: rgba(255, 255, 255, 0.1);
    --third: #AC907D;
  }

  * {
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
  }

  body {
    display: flex;
    margin: 0;
    overflow: hidden;
    background: linear-gradient(207.76deg, var(--secondary) 1.71%, #000 98.47%);
  }

  #app {
    width: 100%;
    height: 100vh;
    overflow: auto;
    max-height: 100vh;
  }

  .logo {
    max-width: 100%;
  }

  .screen {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 15px 30px 30px;
    box-sizing: border-box;
  }

  .screen-4 .Timer {
    text-align: right;
    margin: 0 -20px;
  }

  .screen-1 .Timer {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>