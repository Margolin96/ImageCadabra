<template>
  <div class="Users">
    <div class="row">
      <User :i="1" :user="players[0]" />
      <User :i="2" :user="players[1]" />
    </div>

    <div class="row">
      <User :i="3" :user="players[2]" />
      <div class="slot"><slot /></div>
      <User :i="4" :user="players[3]" />
    </div>

    <div class="row">
      <User :i="5" :user="me" :me="true" />
    </div>
  </div>
</template>

<script>
  import User from './User';

  export default {
    props: ['players', 'me'],
    components: {
      User
    },
    computed: {
    },
    data: () => ({})
  }
</script>

<style>
  .Users {
    margin: 15px 0;
    padding: 5px 0;
  }
  .Users .slot {
    width: 140px;
    margin: 10px 0;
    text-align: center;
  }
  .Users .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>