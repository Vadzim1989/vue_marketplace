<template>
  <teleport to='body'>
    <ItemsModalInfo
      v-if="isOpenModal && isValideWindowSize"
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
      :is-favorite="isFavorite"
      @edit-mode="() => $emit('editMode', item)"
      @on-click-add="() => toggleCartItems(item)"
      @on-click-favorite="() => addToFavorite(item)"
      @show-modal="() => showModal(item)"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Card from './Card.vue';
import ItemsModalInfo from "./ItemsModalInfo.vue";
import { useItems } from '@/utils/useItems';

defineProps({
  items: Array,
  isOrders: Boolean,
  isFavorite: Boolean,
});

defineEmits(['editMode'])

const { addToFavorite, toggleCartItems } = useItems();

const isValideWindowSize = computed(() => window.innerWidth > 600);

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