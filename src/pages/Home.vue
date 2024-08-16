<script setup>
import { reactive, watch, ref, onMounted, inject } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from '@/components/CardList.vue'

const { cart, addToCart } = inject('cart')
const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const getItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) params.title = `*${filters.searchQuery}*`
    const { data } = await axios.get('https://611323be906f6c89.mokky.dev/items', {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}
const getFavorites = async () => {
  try {
    const { data } = await axios.get('https://611323be906f6c89.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = data.find((favorite) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://611323be906f6c89.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://611323be906f6c89.mokky.dev/favorites/${item.favoriteId}`)
      delete item.favoriteId
    }
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  await getItems()
  await getFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
watch(filters, getItems)
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>
<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">All items</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">Name</option>
        <option value="price">Price(low)</option>
        <option value="-price">Price(high)</option>
      </select>
      <div class="relative">
        <img src="/search.svg" alt="Search" class="absolute left-4 top-3" />
        <input
          @input="onChangeSearchInput"
          type="text"
          placeholder="search..."
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="addToCart" />
  </div>
</template>
