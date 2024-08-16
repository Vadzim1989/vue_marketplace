<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'

const favorites = ref([])
const { cart, addToCart } = inject('cart')

const removeFromFavorites = async (item) => {
  try {
    await axios.delete(`https://611323be906f6c89.mokky.dev/favorites/${item.favoriteId}`)
    favorites.value = favorites.value.filter((obj) => obj.favoriteId !== item.favoriteId)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
    const { data } = await axios.get('https://611323be906f6c89.mokky.dev/favorites')
    // create favorite list
    favorites.value = data.map(({ item, id }) => ({
      ...item,
      favoriteId: id
    }))
    // check if item is added to cart
    favorites.value = favorites.value.map((item) => ({
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
  <CardList :items="favorites" @add-to-favorite="removeFromFavorites" @add-to-cart="addToCart" />
</template>
