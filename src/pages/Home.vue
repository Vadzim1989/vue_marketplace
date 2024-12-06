<template>
  <teleport to='body'>
    <ItemModal v-if="isOpenAddModal" v-model="editData" :edit-data="editData" :edit="edit" @close="closeItemModal" @update-items="updateItems"/>
  </teleport>
  <div class="bg-white pb-5 flex justify-between items-center flex-wrap flex-row md:sticky md:top-0 md:z-10">
    <h2 class="text-3xl font-bold mb-8">All items</h2>
    <div class="flex gap-4 flex-col md:flex-row">
      <div class="flex flex-col gap-1">
        <span>Category:</span>
        <select v-model="filters.category" class="py-2 px-3 border rounded-md outline-none max-w-56">
          <option v-for="(item, index) in CATEGORY_VALES" :key="index" :value="item.value">{{ item.name }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <span>Sort By:</span>
        <select v-model="filters.sortBy" class="py-2 px-3 border rounded-md outline-none max-w-56">
          <option v-for="(item, index) in SORT_VALUES" :key="index" :value="item.value">{{ item.name }}</option>
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
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 max-w-56"
          />
        </div>
      </div>
      <div v-if="user.role === 'admin'" class="add-item" @click="isOpenAddModal = true">
        <span>&#x271B;</span>
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @edit-mode="editMode"/>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { getItemsData } from '@/stores/items';
import { cartData } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { useItems } from '@/utils/useItems';
import { auth } from '@/stores/auth';

import debonce from 'lodash.debounce';
import CardList from '@/components/CardList.vue';
import ItemModal from '@/components/ItemModal.vue';

import { CATEGORY_VALES, SORT_VALUES } from '@/constants';

const store = getItemsData();
const dataCart = cartData();
const { items, filters } = storeToRefs(store);
const { cart } = storeToRefs(dataCart);
const { user } = auth();
const { getItems } = useItems();

const edit = ref(false);
const editData = ref({});
const isOpenAddModal = ref(false);

async function updateItems() {
  await getItems();
}

function closeItemModal() {
  isOpenAddModal.value = false;
  edit.value = false;
}

function editMode(data) {
  edit.value = true;
  editData.value = data;
  isOpenAddModal.value = true;
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
}, {deep: true});

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
});
</script>
<style scoped>
.add-item {
  width: 35px;
  height: 35px;
  border-radius: 12px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  cursor: pointer;
  background-color: #f0efef;
  transition: all .4s ease;
}
.add-item:hover {
  background-color: #d7eeac;
}
.add-item:hover > span {
  transform: scale(1.5);
}
</style>