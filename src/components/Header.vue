<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue marketplace</h2>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        @click="() => emit('openDrawer')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }}</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Favorite" />
          <span>Favorite</span>
        </li>
      </router-link>
      <router-link to="/profile"
        ><li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Profile</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>
