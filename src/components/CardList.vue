<template>
  <teleport to='body'>
    <ModalItem
      v-if="isOpenModal"
      v-model="isOpenModal"
      :item="modalData"
      :is-orders="isOrders"
      @on-click-add="() => toggleCartItems(modalData)"
      @on-click-favorite="() => addToFavorite(modalData)"
    />
  </teleport>
  <div class="flex justify-evenly flex-row flex-wrap gap-4 card-list" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-orders="isOrders"
      @on-click-add="() => toggleCartItems(item)"
      @on-click-favorite="() => addToFavorite(item)"
      @show-modal="() => showModal(item)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from './Card.vue'
import ModalItem from "./ModalItem.vue";
import { getItemsData } from '@/stores/items';
import { cartData } from '@/stores/cart';

defineProps({
  items: Array,
  isOrders: Boolean
});

const itemStore = getItemsData();
const cartStore = cartData();

const { addToFavorite } = itemStore;
const { toggleCartItems } = cartStore;

const isOpenModal = ref(false);
const modalData = ref({});
function showModal(obj) {
  isOpenModal.value = true;
  modalData.value = obj;
}
</script>
<style scoped>
.card-list {
  min-height: 55vh;
}
</style>