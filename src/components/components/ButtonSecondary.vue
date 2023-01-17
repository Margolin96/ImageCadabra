<template>
  <div class="ButtonSecondary">
    <slot />
  </div>
</template>

<script>
  export default {
    data: () => ({})
  }
</script>

<style>

  .ButtonSecondary {
    margin-top: 30px;
    background-color: var(--light);
    color: var(--primary);
    border: 2px solid var(--primary);
    font-weight: 500;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 50px;
    border-radius: 10px;
  }

</style>