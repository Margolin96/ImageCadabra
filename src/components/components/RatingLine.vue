<template>
  <div class="RatingLine" v-if="data">
    <div class="avatar" :style="{backgroundImage: `url(${data.pic})`}"></div>
    <div class="name">{{ data.name }}</div>
    <div class="score" v-if="data.score">{{ data.score }}</div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data: () => ({})
  }
</script>

<style scoped>
  .RatingLine {
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
  }

  .avatar {
    width: 35px;
    height: 35px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px solid #EEE;
    border-radius: 50%;
    margin-right: 15px;
  }

  .name {
    flex: 1;
    color: var(--third);
  }

  .score {
    width: 50px;
    font-size: 20px;
    text-align: right;
    color: var(--primary);
  }
</style>