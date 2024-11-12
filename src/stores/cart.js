import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const cartData = defineStore('cart', () => {
    const cart = ref([]);
    const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0));
    
    cart.value = JSON.parse(localStorage.getItem('cart') || '[]')

    async function toggleCartItems(item) {
        if (!item.isAdded) {
            cart.value.push(item)
            item.isAdded = true
        } else {
            cart.value.splice(cart.value.indexOf(item), 1)
            item.isAdded = false
        }
    }

    return {
        cart,
        totalPrice,
        toggleCartItems
    }
});