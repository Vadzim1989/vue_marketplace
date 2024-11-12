<template>
  <h2 class="text-3xl font-bold mb-8">Favorites</h2>
  <CardList :items="favoritesItems" @add-to-favorite="addToFavorite" @add-to-cart="toggleCartItems" />
</template>

<script setup>
import { cartData } from '@/stores/cart';
import { getItemsData } from '@/stores/items';
import { storeToRefs } from 'pinia'
import CardList from '@/components/CardList.vue'

const dataCart = cartData();
const { toggleCartItems } = dataCart;

const favoriteData = getItemsData();
const { favoritesItems } = storeToRefs(favoriteData);
const { addToFavorite } = favoriteData;
</script>