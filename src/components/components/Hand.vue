<template>
  <div class="Hand" :class="{moved: isMoved, ['count-' + cards.length]: true}">
    <div class="inner">
      <Card v-for="card in cards" :key="card.imageUrl" :data="card" />
    </div>
  </div>
</template>

<script>
  import Card from './Card';

  export default {
    props: ['cards'],
    computed: {
      isMoved() {
        return this.$store.state.user.movedCard && this.$store.state.user.movedCard.imageUrl;
      }
    },
    components: {
      Card
    },
    data: () => ({})
  }
</script>

<style>
  .Hand {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 15px;
    box-sizing: border-box;
  }
  .Hand.count-4 .Card {
    margin-left: 5px;
    margin-right: 5px;
  }
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Hand.moved .Card {
    opacity: .3;
  }
</style>