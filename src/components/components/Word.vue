<template>
  <div class="Word" :class="'Word-' + i">
    Lorem ipsum
  </div>
</template>

<script>
  export default {
    props: ['i'],
    data: () => ({})
  }
</script>

<style>
  .Word {
    background-color: var(--light);
    border: 2px dashed var(--primary);
    border-radius: 10px;
    padding: 15px 20px;
    color: var(--primary);
    text-align: center;
    font-size: 24px;
    font-style: italic;
  }
</style>