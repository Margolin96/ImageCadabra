<template>
  <div class="User" :class="{
    me,
    ['User-' + i]: true
  }" v-if="user">
    <div class="avatar" :style="{backgroundImage: `url(${user.pic})`}"></div>
    <div class="name" v-if="user.name">{{ user.name }}</div>
    <div class="score" v-if="user.score">
      {{ user.score }}
      <span v-if="plus" class="plus">(+{{ plus }})</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['i', 'me', 'user', 'plus'],
    data: () => ({})
  }
</script>

<style>
  .User {
    margin: -5px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .User-1 .avatar { background-image: url('../../assets/Ellipse 19.png'); }
  .User-2 .avatar { background-image: url('../../assets/Ellipse 19-1.png'); }
  .User-3 .avatar { background-image: url('../../assets/Ellipse 19-2.png'); }
  .User-4 .avatar { background-image: url('../../assets/Ellipse 19-3.png'); }

  .User-3 { margin-left: 0; }
  .User-4 { margin-right: 0; }

  .avatar {
    width: 30px;
    height: 30px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-bottom: 5px;
  }
  .User.me .avatar {
    display: none;
  }

  .name {
    flex: 1;
    line-height: 24px;
    color: var(--third);
  }
  .User.me .name {
    font-weight: bold;
  }

  .score {
    line-height: 24px;
    width: 50px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: var(--primary);
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }
  .score .plus {
    margin-left: 5px;
  }
</style>