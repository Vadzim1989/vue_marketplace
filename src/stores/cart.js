import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const cartData = defineStore('cart', () => {
    const cart = ref([]);
    const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0));
    
    cart.value = JSON.parse(sessionStorage.getItem('cart') || '[]')

    return {
        cart,
        totalPrice,
    }
});