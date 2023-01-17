<template>
  <div class="Card" :class="{active: down}" v-if="data.imageUrl && (nonhand || !isSelected)">
    <div class="inner" :style="{backgroundImage: `url(${data.imageUrl})`}"></div>
  </div>
</template>

<script>
  import { bus } from "../../bus";

  export default {
    props: ['data', 'nonhand'],
    data: () => ({
      el: null,
      down: false,
      start: {},
      throttle: {
        lastMove: 0,
        eventThrottle: 1000 / 80
      }
    }),
    computed: {
      isSelected() {
        const selected = this.$store.state.user.selectedCard;
        return selected && selected.imageUrl === this.data.imageUrl;
      }
    },
    methods: {
      mouseDownHandler({ touches, screenX, screenY }) {
        if (touches) {
          screenX = touches[0].screenX;
          screenY = touches[0].screenY;
        }

        this.$store.dispatch('user/movedCardSet', this.data);

        this.down = true;
        this.start = {
          screenX,
          screenY
        };
        this.mouseMoveHandler({ touches, screenX, screenY });
      },
      mouseMoveHandler({ touches, pageX, pageY }) {
        if (!this.down) return;

        let screenX, screenY;

        if (touches) {
          screenX = touches[0].pageX;
          screenY = touches[0].pageY;
        } else {
          screenX = pageX;
          screenY = pageY;
        }

        let now = Date.now();
        if (now > this.throttle.lastMove + this.throttle.eventThrottle) {
          this.throttle.lastMove = now;
        } else {
          return;
        }

        this.current = {
          screenX,
          screenY
        };

        console.log(this.current);

        this.el.style.top = this.current.screenY + 'px';
        this.el.style.left = this.current.screenX + 'px';
      },
      mouseUpHandler() {
        if (this.down) {
          this.down = false;
          this.el.style.top = '0';
          this.el.style.left = '0';
        }
      }
    },
    mounted() {
      if (this.nonhand) return;

      this.el = this.$el.getElementsByClassName('inner')[0];
      bus.$on('mouseUp', this.mouseUpHandler);
      bus.$on('mouseMove', this.mouseMoveHandler);
      this.$el.addEventListener('mousedown', this.mouseDownHandler);
      this.$el.addEventListener('touchstart', this.mouseDownHandler);
    },
    beforeDestroy() {
      if (this.nonhand) return;

      bus.$off('mouseUp', this.mouseUpHandler);
      bus.$off('mouseMove', this.mouseMoveHandler);
      this.$el.removeEventListener('mousedown', this.mouseDownHandler);
      this.$el.removeEventListener('touchstart', this.mouseDownHandler);
    }
  }
</script>

<style>
  .Card {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: -5px;
    width: 80px;
    height: 120px;
    transition: .2s;
  }

  .Card .inner {
    box-sizing: border-box;
    width: 80px;
    height: 120px;
    position: static;
    border: 2px solid var(--primary);
    border-radius: 10px;
    background-color: var(--secondary);
    transition: transform .2s;
    color: var(--third);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .Hand.moved .Card {
    margin: -5px 0;
  }
  .Hand.moved .Card.active {
    opacity: 1;
  }
  .Card.active .inner {
    transform: translateY(-60px) translateX(-40px) scale(2);
    border-width: 1px;
    z-index: 10;
    pointer-events: none;
    position: fixed;
  }
</style>