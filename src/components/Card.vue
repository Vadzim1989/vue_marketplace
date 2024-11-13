<template>
  <div
    class="max-w-80 grow relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="!isOrders"
      :src="!item.isFavorite ? 'like-1.svg' : 'like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8 cursor-pointer rounded-3xl btn-like"
      @click="onClickFavorite"
    />
    <img :src="item.imageUrl" alt="item" @click="$emit('showModal')"/>
    <p class="mt-2">{{ item.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ item.price }} $</b>
      </div>
      <img
        v-if="!isOrders"
        @click="onClickAdd"
        :src="!item.isAdded ? 'plus.svg' : 'checked.svg'"
        alt="Plus"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  isOrders: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
});
defineEmits(['showModal']);
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


