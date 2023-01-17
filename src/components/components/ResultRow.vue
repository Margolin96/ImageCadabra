<template>
  <div class="ResultRow">
    <User :i="i" :user="data" :plus="votes.length" />
    <Card :data="data.choice" :nonhand="true" />
    <div class="resultData">
      <div class="votes">
        <User v-for="(user, index) in votes" :user="user" :i="index" :key="user.id" />
      </div>
      <div class="share" @click="share(data.choice)">
        <img src="@/assets/share.svg" />
        Поделиться
      </div>
    </div>
  </div>
</template>

<script>
  import bridge from '@vkontakte/vk-bridge';

  import { mapGetters } from 'vuex';

  import User from "./User";
  import Card from "./Card";

  export default {
    props: ['i', 'data'],
    computed: {
      ...mapGetters({
        room: 'game/room'
      }),

      votes() {
        let players = [];

        if (Array.isArray(this.room.players)) {
          players = this.room.players;
        }

        players = players.filter(player => player.vote.userId === this.data.id).map(player => ({
          pic: player.pic
        }));

        return players;
      }
    },
    components: {
      User,
      Card
    },
    data: () => ({}),
    methods: {
      share(data) {
        bridge.send("VKWebAppShowStoryBox", {
          "background_type": "image",
          "url": data.imageUrl
        });
      }
    }
  }
</script>

<style>
  .ResultRow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: -10px 0;
  }
  .ResultRow > .User {
    margin: 0 10px 0 5px;
    width: 85px;
  }
  .ResultRow .score {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ResultRow .Card {
    transform: scale(0.8) rotate(-8deg);
  }
  .votes {
    height: 35px;
    display: flex;
    justify-content: flex-start;
    margin-left: -5px;
  }
  .votes .User {
    margin: 0 5px;
  }
  .resultData {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
  }
  .share {
    margin-top: 10px;
    color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: 7px 15px 7px 10px;
    background-color: var(--light);
    font-size: 14px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .share img {
    height: 17px;
    margin-right: 10px;
  }
</style>