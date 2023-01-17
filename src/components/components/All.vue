<template>
  <div class="ComponentsAll">
    <div class="screen screen-0" v-if="step === 0">
      <img class="logo" src="@/assets/logo.svg" />

      <div class="pageContent">
        <ButtonPrimary>Играть</ButtonPrimary>
        <ButtonSecondary>Играть с друзьями</ButtonSecondary>
      </div>

      <Rating>
        <RatingTabs />
        <RatingLine v-for="i in 4" :key="i" />
      </Rating>
    </div>

    <div class="screen screen-1" v-if="step === 1">
      <Header />

      <Users>
        <Timer />
      </Users>

      <Hint>Выберите любую фразу</Hint>

      <Words />
    </div>

    <div class="screen screen-2" v-if="step === 2">
      <Header />

      <Users>
        <Timer />
      </Users>

      <Hint>Выберите карту, подходящую фразе</Hint>

      <DropZone>Я решаю большинство своих проблем с помощью...</DropZone>

      <Hand :count="5" />
    </div>

    <div class="screen screen-3" v-if="step === 3">
      <Header />

      <Users>
        <Timer />
      </Users>

      <Hint>Проголосуйте за лучший ответ</Hint>

      <DropZone>Что вы хотите видеть сразу как проснулись?</DropZone>

      <Hand :count="4" />
    </div>

    <div class="screen screen-4" v-if="step === 4">
      <Header />

      <Phrase>Что вы хотите видеть сразу как проснулись?</Phrase>

      <Results />

      <Timer />
    </div>
  </div>
</template>

<script>
  import { bus } from '../../bus';

  import ButtonPrimary from './ButtonPrimary';
  import ButtonSecondary from './ButtonSecondary';

  import Rating from './Rating';
  import RatingTabs from './RatingTabs';
  import RatingLine from './RatingLine';

  import Header from './Header';

  import Users from './Users';
  import Timer from './Timer';
  import Hint from './Hint';
  import Words from './Words';
  import Hand from './Hand';
  import DropZone from './DropZone';
  import Phrase from './Phrase';
  import Results from './Results';

  export default {
    name: 'AllComponents',
    components: {
      ButtonPrimary,
      ButtonSecondary,

      Header,
      Users,
      Timer,
      Hint,
      Words,
      Hand,
      Phrase,
      DropZone,
      Results,

      Rating,
      RatingTabs,
      RatingLine
    },
    data: () => ({
      step: 0
    }),
    methods: {
      mouseMoveHandler(e) {
        bus.$emit('mouseMove', e);
      },
      mouseUpHandler(e) {
        bus.$emit('mouseUp', e);
      }
    },
    mounted() {
      document.addEventListener('mousemove', this.mouseMoveHandler);
      document.addEventListener('mouseup',   this.mouseUpHandler);

      document.addEventListener('touchmove', this.mouseMoveHandler);
      document.addEventListener('touchend',   this.mouseUpHandler);
      document.addEventListener('touchcancel',   this.mouseUpHandler);
    },
    beforeDestroy() {
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

  .logo {
    width: 100%;
  }
  .pageContent {
    padding: 10px;
  }
  .ComponentsAll {
    height: 100%;
    box-sizing: border-box;
    background: linear-gradient(207.76deg, var(--secondary) 1.71%, rgba(32, 14, 41, 0) 98.47%);
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
</style>