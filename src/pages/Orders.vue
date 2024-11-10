<script setup>
import { onMounted, ref } from 'vue'
import { itemsService } from '@/services/items'
import CardList from '@/components/CardList.vue'

const orders = ref([])

onMounted(async () => {
  try {
    const { getOrders } = itemsService();
    const { data } = await getOrders();
    // create favorite list
    orders.value = data.map(({ items }) => items).flat()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">My orders</h2>
  <CardList :items="orders" is-orders />
</template>
