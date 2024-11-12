<template>
  <teleport to='body'>
    <ModalItem
      v-if="showModal"
      v-model="showModal"
      :title="title"
      :price="price"
      :image-url="imageUrl"
      :is-favorite="isFavorite"
      :is-added="isAdded"
      :is-orders="isOrders"
      @on-click-add="onClickAdd"
      @on-click-favorite="onClickFavorite"
    />
  </teleport>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="!isOrders"
      :src="!isFavorite ? 'like-1.svg' : 'like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8 cursor-pointer rounded-3xl btn-like"
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="item" @click="showModal = !showModal"/>
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }} $</b>
      </div>
      <img
        v-if="!isOrders"
        @click="onClickAdd"
        :src="!isAdded ? 'plus.svg' : 'checked.svg'"
        alt="Plus"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import ModalItem from "./ModalItem.vue";

defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  isOrders: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})

const showModal = ref(false);
</script>

<style scoped>
.btn-like {
  box-shadow: 0 0 10px 0 #ff0000;
}
.btn-close {
  box-shadow: 0 0 10px 0 #000;
}
.btn-add {
  box-shadow: 0 0 10px 0 #00ff00;
}
</style>


