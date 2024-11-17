import { defineStore } from "pinia";
import { ref } from "vue";
import { authServices } from "@/services/auth";
import { useRouter } from "vue-router";

export const auth = defineStore('auth', () => {
    const user = ref({
        login: '',
        id: null,
    });
    const singIn = ref(true);

    if(sessionStorage.getItem('user')) user.value = JSON.parse(sessionStorage.getItem('user'));

    const router = useRouter()

    const { authUser, registerUser } = authServices();

    async function loginUser(login, password) {
        try {
            const params = {
                login,
                password,
            }
            const { data } = singIn.value ? await authUser(params) : registerUser(params);
            user.value.login = data.data.login;
            user.value.id = data.data.id;
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return {
        user,
        singIn,
        loginUser,
    }
})