<template>
  <div class="Words">
    <div class="row">
      <Word :i="1" />
      <Word :i="2" />
    </div>

    <div class="row">
      <Word :i="3" />
      <div class="slot"><slot /></div>
      <Word :i="4" />
    </div>

    <div class="row">
      <Word :i="5" />
    </div>
  </div>
</template>

<script>
  import Word from './Word';

  export default {
    components: {
      Word
    },
    data: () => ({})
  }
</script>

<style>
  .Words {
    display: block;
    background-image: url('../../assets/Logo with magic.png');
    background-position: center;
    background-size: 70px;
    background-repeat: no-repeat;
  }
  .row {
    display: flex;
    justify-content: center;
  }
  .Word {
    font-size: 16px;
    width: 60px;
    margin: 15px 25px;
    padding: 15px;
  }
  .Word.Word-1 {
    margin-left: 0;
  }
  .Word.Word-2 {
    margin-right: 0;
  }
  .Word.Word-3 {
    margin-left: 0;
  }
  .Word.Word-4 {
    margin-right: 0;
  }
  .Word.Word-5 {
    margin-top: 5px;
    margin-left: 0;
    margin-right: 0;
  }

  .slot {
    width: 80px;
  }
</style>