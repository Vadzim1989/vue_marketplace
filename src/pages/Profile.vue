<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'

const orders = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://611323be906f6c89.mokky.dev/orders')
    // create favorite list
    orders.value = data.map(({ items }) => items).flat()
    console.log(orders.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">My orders</h2>
  <CardList :items="orders" is-orders />
</template>
