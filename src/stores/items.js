import { defineStore } from "pinia";
import { ref } from "vue";
import { itemsService } from "@/services/items";

export const getItemsData = defineStore('items', () => {
    const items = ref([]);
    const filters = ref({
        sortBy: 'title',
        searchQuery: ''
    });
    const favoritesItems = ref([]);

    const { datas, favorites, addFavorites, deleteFavorites } = itemsService();
    async function getItems() {
        try {
            const params = {
            sortBy: filters.value.sortBy
            }
            if (filters.value.searchQuery) params.title = `*${filters.value.searchQuery}*`
            const { data } = await datas(params);
            items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            isAdded: false
            }))
        } catch (err) {
            console.error(err)
        }
    }
    async function getFavorites() {
        try {
          const { data } = await favorites();
          items.value = items.value.map((item) => {
            const favorite = data.find((favorite) => favorite.parentId === item.id)
            if (!favorite) {
              return item
            }
            favoritesItems.value.push({
              ...item,
              isFavorite: true,
              favoriteId: favorite.id
            })
            return {
              ...item,
              isFavorite: true,
              favoriteId: favorite.id
            }
          })
        } catch (err) {
          console.error(err)
        }
    }
    async function addToFavorite(item) {
        try {
          if (!item.isFavorite) {
            const obj = {
              parentId: item.id,
              item
            }
            item.isFavorite = true
            const { data } = await addFavorites(obj);
            item.favoriteId = data.id
            favoritesItems.value.push(item);
          } else {
            item.isFavorite = false
            await deleteFavorites(item.favoriteId);
            favoritesItems.value = favoritesItems.value.filter((obj) => obj.favoriteId !== item.favoriteId)
            delete item.favoriteId
          }
        } catch (err) {
          console.log(err)
        }
    }
    return { 
      items, 
      filters, 
      favoritesItems,
      getItems, 
      getFavorites, 
      addToFavorite 
    }
})