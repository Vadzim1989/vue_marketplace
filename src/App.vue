<script setup>
import { computed, provide, ref, watch } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Cart (start) */
const drawerOpen = ref(false)
const cart = ref([])
const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0)) // make reactive value
const taxPrice = computed(() => Math.round(totalPrice.value * 0.05))

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}
const addToCart = async (item) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }
}
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
provide('cart', {
  cart,
  toggleDrawer,
  addToCart
})
/* Cart (end) */
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :tax-price="taxPrice" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-2xl mt-14">
    <Header @open-drawer="toggleDrawer" :total-price="totalPrice" />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style scoped></style>
