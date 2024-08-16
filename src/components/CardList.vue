<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :on-click-add="isOrders ? null : () => emit('addToCart', item)"
      :on-click-favorite="isOrders ? null : () => emit('addToFavorite', item)"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
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
