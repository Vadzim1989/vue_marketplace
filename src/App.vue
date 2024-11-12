<template>
  <Drawer v-if="drawerOpen" @close-drawer="toggleDrawer"/>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-inner-xl mt-14">
    <Header @open-drawer="toggleDrawer" :total-price="totalPrice" />
    <div class="p-10 mb-14">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { getItemsData } from '@/stores/items'
import { cartData } from '@/stores/cart';
import { storeToRefs } from 'pinia'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const store = getItemsData();
const dataCart = cartData();
const { items } = storeToRefs(store);
const { cart, totalPrice }  = storeToRefs(dataCart);
const { getItems, getFavorites } = store;
const drawerOpen = ref(false);

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
};
watch(cart, 
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

onMounted(async () => {
  await getItems();
  await getFavorites();
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.find((cartItem) => cartItem.id === item.id)
  }));
})
</script>
