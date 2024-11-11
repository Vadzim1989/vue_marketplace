<template>
  <teleport to='body'>
    <div v-if="showModal" class="item-modal-wrapper">
      <div class="item-modal">
        <img
          v-if="onClickFavorite"
          :src="!isFavorite ? 'like-1.svg' : 'like-2.svg'"
          alt="Like"
          class="absolute top-8 left-8 cursor-pointer rounded-3xl btn-like"
          @click="onClickFavorite"
        />
        <img class="m-auto max-h-96 border border-slate-100 rounded-3xl" :src="imageUrl" alt="item" />
        <img
          src="/close.svg"
          alt="Close"
          class="absolute top-8 right-8 cursor-pointer rounded-3xl btn-close"
          @click="showModal = !showModal"
        />
        <p class="mt-2 p-2 text-center">{{ title }}</p>
        <div class="flex justify-between px-5 py-5">
          <div class="flex flex-row gap-3">
            <span class="text-slate-400">Price:</span>
            <b>{{ price }} $</b>
          </div>
          <img
            v-if="onClickAdd"
            @click="onClickAdd"
            :src="!isAdded ? 'plus.svg' : 'checked.svg'"
            alt="Plus"
            class="cursor-pointer rounded-3xl btn-add"
          />
        </div>
      </div>
    </div>
  </teleport>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickFavorite"
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
        v-if="onClickAdd"
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

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})

const showModal = ref(false);
</script>

<style scoped>
.item-modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.item-modal {
  width: 500px;
  height: 530px;
  position: absolute;
  top: 50%; 
  left: 50%;
  border-radius: 5%;
  box-shadow: 0 0 20px 20px #fff;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  padding: 15px;
}
.btn-like {
  box-shadow: 0 0 10px 0 #ff0000;
}
.btn-close {
  box-shadow: 0 0 10px 0 #000;
}
.btn-add {
  box-shadow: 0 0 10px 0 #00ff00;
}
</style>>


