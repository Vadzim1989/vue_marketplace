<template>
    <form @submit.stop.prevent class="auth-form">
        <div class="inputs-form">
            <input class="focus:outline-yellow-500 focus:bg-yellow-100" name="login" type="text" v-model="login" placeholder="Login...">
            <input class="focus:outline-yellow-500 focus:bg-yellow-100" name="password" type="text" v-model="password" placeholder="Password...">
        </div>
        <input class="submit-btn" :class="{active: isActiveBtn}" type="submit" :disabled="!isActiveBtn" :value="submitBtnTitle" @click="loginUser">
    </form>
</template>

<script setup>
import { auth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { authServices } from "@/services/auth";
import { useRouter } from "vue-router";
import { useItems } from '@/utils/useItems';

const userData = auth();
const { user, singIn } = storeToRefs(userData); 
const { getFavorites } = useItems();

const login = ref('');
const password = ref('');

const isActiveBtn = computed(() => login.value && password.value);
const submitBtnTitle = computed(() => singIn.value ? 'Sing In' : 'Sing up');

const router = useRouter();

const { authUser, registerUser } = authServices();

async function loginUser() {
    try {
        const params = {
            login: login.value,
            password: password.value,
        };
        const { data } = singIn.value ? await authUser(params) : registerUser(params);
        user.value.login = data.data.login;
        user.value.id = data.data.id;
        sessionStorage.setItem('user', JSON.stringify(user.value));
        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

watch(user, 
  async () => {
    await getFavorites(user.value.id);
  },
  {
    deep: true
  } 
);
</script>

<style scoped>
.auth-form {
    min-height: 55vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
}
.inputs-form {
    max-width: 240px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}
.submit-btn {
    width: 80px;
    border: 1px solid gray;
    border-radius: 25px;
    font-weight: 500;
    transition: all .3s ease;
    cursor: pointer;
}
.submit-btn.active:hover {
    background-color: #d7eeac;
}
</style>