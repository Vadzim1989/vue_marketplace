<template>
  <h2 class="text-3xl font-bold flex-wrap mb-8">My orders</h2>
  <CardList :items="orders" is-orders />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { itemsService } from '@/services/items'
import { auth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import CardList from '@/components/CardList.vue'

const orders = ref([]);

const authData = auth();
const { user } = storeToRefs(authData);

onMounted(async () => {
  try {
    const params = {
      userId: user.value.id
    }
    const { getOrders } = itemsService();
    const { data } = await getOrders(params);
    orders.value = data.map(({ items }) => items).flat()
  } catch (error) {
    console.log(error)
  }
})
</script>
