<template>
  <header class="flex justify-start border-b border-slate-300 px-10 py-8 flex-wrap md:justify-between">
    <router-link to="/" class="m-auto mb-5 md:m-0">
          <h2 class="text-xl font-bold uppercase">Shop</h2>
    </router-link>
    <ul class="flex items-center gap-3 md:gap-10">
      <template v-if="user.id">
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
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black" @click="logOut">
          <span>Log Out</span>
        </li>
      </template>
      <template v-else>
        <router-link to="/login">
          <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black" @click="singIn = true">
            <span>Sing In</span>
          </li>
        </router-link>
        <router-link to="/login"
          ><li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black" @click="singIn = false">
            <span>Sing Up</span>
          </li>
        </router-link>
      </template>
    </ul>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getItemsData } from '@/stores/items';
import { auth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useItems } from '@/utils/useItems';

const favoritesData = getItemsData();
const { favoritesItems } = storeToRefs(favoritesData); 
const { getItems } = useItems();

const authData = auth();
const { user, singIn } = storeToRefs(authData);

const logo = ref(!favoritesItems.value.length ? 'heart.svg' : 'full-heart.svg');

const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})

async function logOut() {
  user.value = {};
  favoritesItems.value = [];
  sessionStorage.removeItem('user');
  await getItems();
} 

watch(favoritesItems, () => {
  logo.value = !favoritesItems.value.length ? 'heart.svg' : 'full-heart.svg';
}, {
  deep: true
})

</script>
