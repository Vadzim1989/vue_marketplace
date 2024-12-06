<template>
  <div
    class="max-w-80 grow relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="!isOrders && user.id"
      :src="!item.isFavorite ? 'like-1.svg' : 'like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8 cursor-pointer rounded-3xl btn-like"
      @click="emit('onClickFavorite')"
    />
    <img :src="item.imageUrl" alt="item" @click="emit('showModal')"/>
    <p class="mt-2">{{ item.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-row gap-2">
        <button 
          v-if="user.role === 'admin' && !isFavorite" 
          class="cursor-pointer rounded-3xl btn-edit"
          @click="emit('editMode')"
          >&#x270E;</button>
        <span class="text-slate-400">Price:</span>
        <b>{{ item.price }} $</b>
      </div>
      <img
        v-if="!isOrders && user.id"
        @click="emit('onClickAdd')"
        :src="!item.isAdded ? 'plus.svg' : 'checked.svg'"
        alt="Plus"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
import { auth } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authData = auth();
const { user } = storeToRefs(authData);

defineProps({
  item: Object,
  isOrders: Boolean,
  isFavorite: Boolean,
});
const emit = defineEmits(['showModal', 'onClickAdd', 'onClickFavorite', 'editMode']);
</script>

<style scoped>
.btn-edit {
  width: 34px;
  height: 34px;
}
.btn-like {
  box-shadow: 0 0 10px 0 #ff0000;
}
.btn-edit {
  box-shadow: 0 0 10px 0 #00ff00;
}
</style>


