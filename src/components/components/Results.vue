<template>
  <div class="Results">
    <ResultRow v-for="(player, index) in players" :i="index" :data="player" :key="player.id" />
  </div>
</template>

<script>
  import ResultRow from "./ResultRow";

  export default {
    props: ['players'],
    components: {
      ResultRow
    },
    data: () => ({})
  }
</script>

<style>
  .Results {
    margin-top: 20px;
    min-height: calc(100% - 140px);
  }
</style>