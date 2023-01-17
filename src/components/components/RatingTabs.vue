<template>
  <div class="RatingTabs">
    <div class="RatingTab">Общий</div>
    <div class="RatingTab active">Месяц</div>
    <div class="RatingTab">Друзья</div>
  </div>
</template>

<script>
  export default {
    data: () => ({})
  }
</script>

<style>
  .RatingTabs {
    border-bottom: 2px solid var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }
  .RatingTab {
    flex: 1;
    padding: 10px 20px;
    color: var(--primary);
    opacity: .7;
    font-size: 16px;
    text-align: center;
  }
  .RatingTab.active {
    opacity: 1;
    font-weight: bold;
    text-decoration: underline;
  }
</style>