<template>
  <div class="ButtonPrimary" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>
  export default {
    data: () => ({})
  }
</script>

<style>

  .ButtonPrimary {
    background-color: var(--primary);
    color: var(--secondary);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-radius: 10px;
  }

</style>