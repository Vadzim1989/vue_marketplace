<template>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-4" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :is-orders="isOrders"
      :on-click-add="() => emit('addToCart', item)"
      :on-click-favorite="() => emit('addToFavorite', item)"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
defineProps({
  items: Array,
  isOrders: Boolean
})
const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
