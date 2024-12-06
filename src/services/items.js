import { axiosIntanse } from "@/http";
import { auth } from "@/stores/auth";
import { storeToRefs } from "pinia";

export function itemsService() {
    const axios = axiosIntanse;
    const authData = auth();
    const { token } = storeToRefs(authData);

    const datas = (params) => axios.get('/items', { params });
    const addItem = (data) => axios.post('/items', data, { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        },
    });
    const updateItem = (id, data) => axios.patch(`/items/${id}`, data, { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        },
    });
    const deleteItem = (id) => axios.delete(`/items/${id}`, { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        },
    });
    const favorites = (params) => axios.get('/favorites', { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        }
    }, { params });
    const addFavorites = (data) => axios.post('/favorites', data, 
    { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        },
    });
    const deleteFavorites = (id) => axios.delete(`/favorites/${id}`, 
    { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        }
    },);
    const order = (data) => axios.post('/orders', data, 
    { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        }
    });
    const getOrders = (params) => axios.get('/orders', { 
        headers: {
            "Authorization": `Bearer ${token.value }`
        }
    }, { params });

    return {
        datas,
        addItem,
        updateItem,
        deleteItem,
        favorites,
        addFavorites,
        deleteFavorites,
        order,
        getOrders
    }
}