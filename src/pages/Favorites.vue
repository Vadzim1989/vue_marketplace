<template>
  <h2 class="text-3xl font-bold mb-8">Favorites</h2>
  <CardList :items="favoritesItems" />
</template>

<script setup>
import { getItemsData } from '@/stores/items';
import { storeToRefs } from 'pinia'
import CardList from '@/components/CardList.vue'

const favoriteData = getItemsData();
const { favoritesItems } = storeToRefs(favoriteData);
</script>