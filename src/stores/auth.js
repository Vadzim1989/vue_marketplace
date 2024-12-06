import { defineStore } from "pinia";
import { ref } from "vue";

export const auth = defineStore('auth', () => {
    const user = ref({
        login: '',
        role: '',
        id: null,
    });
    const token = ref(null);
    const singIn = ref(true);

    if(sessionStorage.getItem('user')) user.value = JSON.parse(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('token')) token.value = JSON.parse(sessionStorage.getItem('token'));

    return {
        user,
        token,
        singIn,
    }
})