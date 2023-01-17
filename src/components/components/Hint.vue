<template>
  <div class="Hint">
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
  .Hint {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .Hint .inner {
    padding: 8px 20px;
    font-weight: 300;
    font-style: italic;
    color: #B9B9B9;
    border-radius: 25px;
    background-color: var(--secondary);
    text-align: center;
    font-size: 16px;
  }
</style>