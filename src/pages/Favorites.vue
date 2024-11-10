<script setup>
import { onMounted, ref, inject } from 'vue'
import { itemsService } from "@/services/items";
import { cartData } from '@/stores/cart';
import { getItemsData } from '@/stores/items';
import { storeToRefs } from 'pinia'
import CardList from '@/components/CardList.vue'

const dataCart = cartData();
const { cart } = storeToRefs(dataCart);
const { toggleCartItems } = dataCart;

const favoriteData = getItemsData();
const { favoritesItems } = storeToRefs(favoriteData);
const { addToFavorite } = favoriteData;

onMounted(async () => {
  try {
    cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Favorites</h2>
  <CardList :items="favoritesItems" @add-to-favorite="addToFavorite" @add-to-cart="toggleCartItems" />
</template>
