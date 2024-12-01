import { defineStore } from "pinia";
import { ref } from "vue";

export const getItemsData = defineStore('items', () => {
    const items = ref([]);
    const filters = ref({
        sortBy: 'title',
        searchQuery: '',
        category: ''
    });
    const favoritesItems = ref([]);
    
    return { 
      items, 
      filters, 
      favoritesItems,
    }
})