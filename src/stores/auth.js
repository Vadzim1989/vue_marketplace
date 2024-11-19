import { defineStore } from "pinia";
import { ref } from "vue";

export const auth = defineStore('auth', () => {
    const user = ref({
        login: '',
        id: null,
    });
    const singIn = ref(true);

    if(sessionStorage.getItem('user')) user.value = JSON.parse(sessionStorage.getItem('user'));

    return {
        user,
        singIn,
    }
})