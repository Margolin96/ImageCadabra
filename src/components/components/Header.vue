<template>
  <div class="Header">
    <div class="left">
      <img class="back" src="@/assets/Door.svg" @click="leaveRoom()" />
    </div>
    <div class="center">
      <img class="logo" src="@/assets/logo-1.svg" />
    </div>
    <div class="right">
      <br/>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({}),
    methods: {
      async leaveRoom() {
        await this.$store.dispatch('game/leaveRoom');
      }
    }
  }
</script>

<style>
  .Header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 -5px;
  }
  img.back {
    display: flex;
    width: 15px;
  }
  .center {
    flex: 1;
  }
  .center .logo {
    margin: -15px 0;
  }
  .left,
  .right {
    display: block;
    width: 50px;
  }
</style>