<template>
    <div class="item-modal-wrapper z-20">
        <div class="item-modal">
        <img
            v-if="!isOrders"
            :src="!isFavorite ? 'like-1.svg' : 'like-2.svg'"
            alt="Like"
            class="absolute top-8 left-8 cursor-pointer rounded-3xl btn-like"
            @click="$emit('onClickFavorite')"
        />
        <img class="m-auto max-h-96 border border-slate-100 rounded-3xl" :src="imageUrl" alt="item" />
        <img
            src="/close.svg"
            alt="Close"
            class="absolute top-8 right-8 cursor-pointer rounded-3xl btn-close"
            @click="$emit('update:modelValue', false)"
        />
        <p class="mt-2 p-2 text-center">{{ title }}</p>
        <div class="flex justify-between px-5 py-5">
            <div class="flex flex-row gap-3">
            <span class="text-slate-400">Price:</span>
            <b>{{ price }} $</b>
            </div>
            <img
            v-if="!isOrders"
            @click="$emit('onClickAdd')"
            :src="!isAdded ? 'plus.svg' : 'checked.svg'"
            alt="Plus"
            class="cursor-pointer rounded-3xl btn-add"
            />
        </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    price: Number,
    imageUrl: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    isOrders: Boolean,
});
defineEmits(['onClickAdd', 'onClickFavorite', 'update:modellValue']);
</script>
<style scoped>
.item-modal-wrapper {
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.item-modal {
  max-width: 500px;
  max-height: 530px;
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
</style>
