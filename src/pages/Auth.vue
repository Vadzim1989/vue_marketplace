<template>
    <Loader v-if="loading" />
    <form v-if="!loading" @submit.stop.prevent class="auth-form">
        <div class="inputs-form">
            <input class="focus:outline-yellow-500 focus:bg-yellow-100" name="login" type="text" v-model="login" placeholder="Login...">
            <input class="focus:outline-yellow-500 focus:bg-yellow-100" name="password" type="password" v-model="password" placeholder="Password...">
        </div>
        <input class="submit-btn" :class="{active: isActiveBtn}" type="submit" :disabled="!isActiveBtn" :value="submitBtnTitle" @click="loginUser">
    </form>
    <details v-if="errorText">
        <summary class="text-red-500 font-medium">Error</summary>
        <span>{{ errorText }}</span>
        <ol v-if="rules">
            <li>The minimum login length is 3 characters.</li>
            <li>The password must contain from 6 to 20 characters, must contain at least one special character, at least one uppercase and lowercase letter.</li>
        </ol>
    </details>
</template>

<script setup>
import { auth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { authServices } from "@/services/auth";
import { useRouter } from "vue-router";
import { useItems } from '@/utils/useItems';

import Loader from '@/components/Loader.vue';

const userData = auth();
const { user, token, singIn } = storeToRefs(userData); 
const { getFavorites } = useItems();

const login = ref('');
const password = ref('');
const errorText = ref('');
const loading = ref(false);
const rules = ref(false);

const isActiveBtn = computed(() => login.value && password.value);
const submitBtnTitle = computed(() => singIn.value ? 'Sing In' : 'Sing up');

const router = useRouter();

const { authUser, registerUser } = authServices();

function validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
};

function validateLogin(login) {
    return login.length >= 3;
};

async function loginUser() {
    if(!singIn.value && (!validatePassword(password.value) || !validateLogin(login.value))) {
        rules.value = true;
        errorText.value = 'Read the rules!!!'
    } else {
        try {
            loading.value = true;
            const params = {
            login: login.value,
            password: password.value,
            };
            const { data } = singIn.value ? await authUser(params) : await registerUser(params);
            if (data) {
                token.value = data?.token;
                user.value.login = data?.data?.login;
                user.value.id = data?.data?.id;
                sessionStorage.setItem('user', JSON.stringify(user.value));
                router.push('/');
            }
        } catch (error) {
            errorText.value = error?.response?.data?.message;
        } finally {
            loading.value = false;
        }
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
summary {
    cursor: pointer;
}
</style>