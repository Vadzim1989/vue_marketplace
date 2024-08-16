<template>
  <div class="flex flex-col gap-4 flex-1" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @remove-from-cart="() => removeFromCart(item)"
    />
  </div>
</template>

<script setup>
import CartItem from './CartItem.vue'
import { inject } from 'vue'

const { cart, addToCart: removeFromCart } = inject('cart')
</script>
