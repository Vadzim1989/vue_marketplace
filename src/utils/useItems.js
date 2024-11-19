import { getItemsData } from "@/stores/items";
import { auth } from "@/stores/auth";
import { cartData } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { itemsService } from "@/services/items";

export const useItems = () => {
    const itemsData = getItemsData();
    const authData = auth();
    const cartDatas = cartData();
    const { items, filters, favoritesItems } = storeToRefs(itemsData);
    const { user } = storeToRefs(authData);
    const { cart } = storeToRefs(cartDatas);


    const { datas, favorites, addFavorites, deleteFavorites } = itemsService();

    async function getItems() {
        try {
            const params = {
            sortBy: filters.value.sortBy,
            }
            if (filters.value.searchQuery) params.title = `*${filters.value.searchQuery}*`
            if (filters.value.category) params.category = filters.value.category
            const { data } = await datas(params);
            items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            isAdded: false
            }))
        } catch (err) {
            console.error(err)
        }
    };

    async function getFavorites(id) {
        try {
          const params = {
            userId: id
          }
          const { data } = await favorites(params);
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
    };

    async function addToFavorite(item) {
        try {
          if (!item.isFavorite) {
            const obj = {
              parentId: item.id,
              userId: user.value.id,
              item
            }
            console.log(obj);
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
    };

    async function toggleCartItems(item) {
        if (!item.isAdded) {
            cart.value.push(item);
            sessionStorage.setItem('cart', JSON.stringify(cart.value));
            item.isAdded = true;
        } else {
            cart.value.splice(cart.value.indexOf(item), 1)
            item.isAdded = false
        }
    }

    return {
        getItems,
        getFavorites,
        addToFavorite,
        toggleCartItems
    }
}