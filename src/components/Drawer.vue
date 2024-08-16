<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />
    <div v-if="!totalPrice || orderCreated" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderCreated"
        title="Cart is empty"
        description="Add at least one item to see your cart"
        image-url="package-icon.png"
      />
      <InfoBlock
        v-if="orderCreated"
        title="Order created"
        image-url="order-success-icon.png"
        description="Your order has been successfully created"
      />
    </div>
    <div v-else>
      <CartItemList />
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }}</b>
        </div>
        <div class="flex gap-2">
          <span>Tax 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ taxPrice }}</b>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="bg-lime-500 w-full mt-4 rounded-xl py-3 transition disabled:bg-slate-300 text-white hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import axios from 'axios'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  taxPrice: Number
})

const { cart } = inject('cart')

const isCreatingOrder = ref(false)
const orderCreated = ref(false)

const buttonDisabled = computed(() =>
  isCreatingOrder.value ? true : props.totalPrice ? false : true
)
const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    await axios.post('https://611323be906f6c89.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })
    cart.value = []
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
    orderCreated.value = true
  }
}
</script>
