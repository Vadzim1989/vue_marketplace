<template>
  <div class="bg-white pb-5 flex justify-between items-center flex-col md:flex-row md:sticky md:top-0 md:z-10">
    <h2 class="text-3xl font-bold mb-8">All items</h2>
    <div class="flex gap-4 flex-col md:flex-row">
      <div class="flex flex-col gap-1">
        <span>Category:</span>
        <select @change="onChangeCategory" class="py-2 px-3 border rounded-md outline-none">
          <option value="">All</option>
          <option value="electrics">Electrics</option>
          <option value="zoo">Zoo</option>
          <option value="toys">Toys</option>
          <option value="foods">Foods</option>
          <option value="beauty">Beauty</option>
          <option value="clothes">Clothes</option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <span>Sort By:</span>
        <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
          <option value="title">Name</option>
          <option value="price">Price(low)</option>
          <option value="-price">Price(high)</option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <span>Search:</span>
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
  </div>
  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="toggleCartItems"/>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { getItemsData } from '@/stores/items'
import { cartData } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import debonce from 'lodash.debounce'
import CardList from '@/components/CardList.vue'

const store = getItemsData();
const dataCart = cartData();
const { items, filters } = storeToRefs(store);
const { cart } = storeToRefs(dataCart);
const { getItems, addToFavorite } = store;
const { toggleCartItems } = dataCart; 

const onChangeCategory = async (event) => {
  filters.value.category = event.target.value;
}

const onChangeSelect = async (event) => {
  filters.value.sortBy = event.target.value;
}

const onChangeSearchInput = debonce((event) => {
  filters.value.searchQuery = event.target.value
}, 500);

watch(filters, async () => {
  await getItems();
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.find((cartItem) => cartItem.id === item.id)
  }));
}, {deep: true})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>