<template>
  <div class="card-list">
    <img class="think-smile" src="/src/assets/img/think-smile.webp" alt="smile">
    <span class="smile-text">I don't known!</span>
  </div>
</template>

<script setup>
</script>
<style scoped>
.card-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 55vh;
}
.think-smile {
  max-height: 200px;
}
.smile-text {
  font-weight: 600;
  font-size: large;
}
</style>