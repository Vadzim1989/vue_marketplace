<script setup>
import { onMounted, ref, inject } from 'vue'
import { itemsService } from "@/services/items";
import { cartData } from '@/stores/cart';
import { storeToRefs } from 'pinia'
import CardList from '@/components/CardList.vue'

const favoritesItems = ref([])

const { favorites, deleteFavorites } = itemsService(); 
const dataCart = cartData();
const { cart } = storeToRefs(dataCart);
const { toggleCartItems } = dataCart;

const removeFromFavorites = async (item) => {
  try {
    await deleteFavorites(item.favoriteId);
    favoritesItems.value = favoritesItems.value.filter((obj) => obj.favoriteId !== item.favoriteId)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
    const { data } = await favorites();
    // create favorite list
    favoritesItems.value = data.map(({ item, id }) => ({
      ...item,
      favoriteId: id
    }))
    // check if item is added to cart
    favoritesItems.value = favoritesItems.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Favorites</h2>
  <CardList :items="favoritesItems" @add-to-favorite="removeFromFavorites" @add-to-cart="toggleCartItems" />
</template>
