<script setup>
import { computed, provide, ref, watch } from 'vue'
import { cartData } from '@/stores/cart';
import { storeToRefs } from 'pinia'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const dataCart = cartData();
const { cart, totalPrice, taxPrice }  = storeToRefs(dataCart);
const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}
watch(cart, 
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
</script>

<template>
  <Drawer v-if="drawerOpen" :cart="cart" :total-price="totalPrice" :tax-price="taxPrice" @close-drawer="toggleDrawer"/>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-2xl mt-14">
    <Header @open-drawer="toggleDrawer" :total-price="totalPrice" />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style scoped></style>
