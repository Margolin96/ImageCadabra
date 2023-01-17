<template>
  <div class="DropZone">
    <Card :data="selectedCard" v-if="selectedCard && selectedCard.imageUrl" :nonhand="true" />

    <img src="@/assets/drop-single.svg" class="img" />
    <div><slot /></div>
  </div>
</template>

<script>
  import Card from './Card';

  import { bus } from "../../bus";
  import { mapGetters } from 'vuex';

  export default {
    props: ['type'],
    components: {
      Card
    },
    computed: {
      ...mapGetters({
        room: 'game/room'
      }),

      selectedCard() {
        return this.$store.state.user.selectedCard ? this.$store.state.user.selectedCard : false;
      },
      movedCard() {
        return this.$store.state.user.movedCard ? this.$store.state.user.movedCard : false;
      }
    },
    data: () => ({
      touches: []
    }),
    methods: {
      mouseUpHandler() {
        if (!this.movedCard) return;
        this.updateCards();
      },
      touchendHandler() {
        if (!this.movedCard) return;

        if (!this.touches || this.touches.length === 0) return;
        const touches = this.touches;

        const offsetTop = this.$el.offsetTop;
        const offsetLeft = this.$el.offsetLeft;
        const offsetRight = offsetLeft + this.$el.offsetWidth;
        const offsetBottom = offsetTop + this.$el.offsetHeight;

        const { pageX, pageY } = touches[0];

        if (pageY < offsetTop || pageY > offsetBottom) return;
        if (pageX < offsetLeft || pageX > offsetRight) return;

        this.updateCards();
      },
      touchMoveHandler({ touches }) {
        if (!touches || touches.length === 0) return;

        this.touches = touches;
      },
      updateCards() {
        bus.$emit('cardDropped', this.card);

        switch(this.type) {
          case 'choose':
            this.$store.dispatch('game/chooseImage', {
              phraseId: this.room.phrase.id,
              imageUrl: this.movedCard.imageUrl
            });
            break;

          case 'vote':
            this.$store.dispatch('game/vote', {
              phraseId: this.room.phrase.id,
              userId: this.movedCard.userId
            });
            break;
        }

        this.$store.dispatch('user/selectedCardSet', this.movedCard);
        this.$store.dispatch('user/movedCardSet');
      }
    },
    mounted() {
      bus.$on('mouseUp', this.touchendHandler);
      bus.$on('mouseMove', this.touchMoveHandler);

      this.$el.addEventListener('mouseup', this.mouseUpHandler);
      this.$el.addEventListener('touchend', this.mouseUpHandler);
      this.$el.addEventListener('touchcancel', this.mouseUpHandler);
    },
    beforeDestroy() {
      bus.$off('mouseUp', this.touchendHandler);
      bus.$off('mouseMove', this.touchMoveHandler);

      this.$el.removeEventListener('mouseup', this.mouseUpHandler);
      this.$el.removeEventListener('touchend', this.mouseUpHandler);
      this.$el.removeEventListener('touchcancel', this.mouseUpHandler);
    }
  }
</script>

<style>
  .DropZone {
    margin: 20px auto 0;
    border: 2px dashed var(--primary);
    background-color: var(--light);
    padding: 20px;
    width: 220px;
    height: 90px;
    border-radius: 10px;
    color: var(--third);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 15px;
    font-style: italic;
  }
  .DropZone .img {
    height: 50px;
    margin-bottom: 5px;
  }
  .DropZone .Card {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -60px -40px;
    transform: scale(0.9) rotate(-10deg);
  }
</style>