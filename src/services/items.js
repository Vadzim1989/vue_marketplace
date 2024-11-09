import { axiosIntanse } from "@/http";

export function itemsService() {
    const axios = axiosIntanse;

    const datas = (filter) => axios.get('/items', {filter});
    const favorites = () => axios.get('/favorites');
    const addFavorites = (data) => axios.post('/favorites', data);
    const deleteFavorites = (id) => axios.delete(`/favorites/${id}`);
    const order = (data) => axios.post('/orders', data);

    return {
        datas,
        favorites,
        addFavorites,
        deleteFavorites,
        order
    }
}