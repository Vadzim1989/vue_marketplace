<template>
  <teleport to='body'>
    <ModalItem
      v-if="isOpenModal"
      v-model="isOpenModal"
      :item="modalData"
      :is-orders="isOrders"
      @on-click-add="() => emit('addToCart', modalData)"
      @on-click-favorite="() => emit('addToFavorite', modalData)"
    />
  </teleport>
  <div class="flex justify-evenly flex-row flex-wrap gap-4" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-orders="isOrders"
      :on-click-add="() => emit('addToCart', item)"
      :on-click-favorite="() => emit('addToFavorite', item)"
      @show-modal="showModal(item)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from './Card.vue'
import ModalItem from "./ModalItem.vue";

defineProps({
  items: Array,
  isOrders: Boolean
});
const emit = defineEmits(['addToFavorite', 'addToCart']);

const isOpenModal = ref(false);
const modalData = ref({});
function showModal(obj) {
  isOpenModal.value = true;
  modalData.value = obj;
}
</script>
