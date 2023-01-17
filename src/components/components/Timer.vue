<template>
  <div class="Timer">
    {{ time }}
  </div>
</template>

<script>
  export default {
    props: ['data'],
    computed: {
      time() {
        const time = [];

        let date = Math.abs(Math.ceil(this.data / 1000));
        let hours = Math.floor(date / 3600);
        date -= hours * 3600;

        let minutes = Math.floor(date / 60);
        date -= minutes * 60;

        let seconds = date;

        if (hours > 0) time.push(('0' + hours).substr(-2));
        if (minutes > 0) time.push(('0' + minutes).substr(-2));
        time.push(('0' + seconds).substr(-2));

        return time.join(':');
      }
    },
    data: () => ({})
  }
</script>

<style>
  .Timer {
    font-weight: 100;
    font-size: 36px;
    color: var(--primary);
  }
</style>