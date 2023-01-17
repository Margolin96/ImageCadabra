<template>
  <div class="Phrase">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({})
  }
</script>

<style>
  .Phrase {
    margin-top: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .Phrase .inner {
    font-weight: 300;
    font-style: italic;
    font-size: 14px;
    padding: 10px 15px;
    background-color: var(--light);
    color: var(--primary);
    border-radius: 10px;
  }
</style>