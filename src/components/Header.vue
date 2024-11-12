<template>
  <header class="flex justify-start border-b border-slate-300 px-10 py-8 flex-wrap md:justify-between">
    <router-link to="/" class="m-auto mb-5 md:m-0">
          <h2 class="text-xl font-bold uppercase">Shop</h2>
    </router-link>
    <ul class="flex items-center gap-3 md:gap-10">
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        @click="() => emit('openDrawer')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} $</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img :src="logo" alt="Favorite" />
          <span>Favorite</span>
        </li>
      </router-link>
      <router-link to="/orders"
        ><li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/orders.svg" alt="Orders" />
          <span>Orders</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getItemsData } from '@/stores/items';
import { storeToRefs } from 'pinia'

const favoritesData = getItemsData();
const { favoritesItems } = storeToRefs(favoritesData); 

const logo = ref(!favoritesItems.value.length ? 'heart.svg' : 'full-heart.svg');

const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})

watch(favoritesItems, () => {
  logo.value = !favoritesItems.value.length ? 'heart.svg' : 'full-heart.svg';
}, {
  deep: true
})

</script>
