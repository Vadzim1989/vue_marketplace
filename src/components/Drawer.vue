<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-30 p-8">
    <DrawerHead @close-drawer="$emit('closeDrawer')"/>
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
import { computed, ref } from 'vue'
import { itemsService } from '@/services/items'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
import { cartData } from '@/stores/cart';
import { auth } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const dataCart = cartData();
const { cart, totalPrice } = storeToRefs(dataCart);

const authData = auth();
const { user } = storeToRefs(authData);

const { order } = itemsService();
const isCreatingOrder = ref(false)
const orderCreated = ref(false)

const buttonDisabled = computed(() =>
  isCreatingOrder.value ? true : totalPrice.value ? false : true
)
const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    await order({
      items: cart.value,
      userId: user.value.id,
      totalPrice: totalPrice.value
    });
    cart.value = []
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
    orderCreated.value = true
  }
}
</script>
