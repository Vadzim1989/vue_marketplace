import { axiosIntanse } from "@/http";

export function itemsService() {
    const axios = axiosIntanse;

    const datas = (params) => axios.get('/items', { params });
    const favorites = (params) => axios.get('/favorites', { params });
    const addFavorites = (data) => axios.post('/favorites', data);
    const deleteFavorites = (id) => axios.delete(`/favorites/${id}`);
    const order = (data) => axios.post('/orders', data);
    const getOrders = (params) => axios.get('/orders', { params });

    return {
        datas,
        favorites,
        addFavorites,
        deleteFavorites,
        order,
        getOrders
    }
}