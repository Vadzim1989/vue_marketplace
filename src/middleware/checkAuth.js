import { auth } from "@/stores/auth";
import { storeToRefs } from "pinia";

export const checkAuth = (to, from, next) => {
    const authData = auth();
    const { user } = storeToRefs(authData);

    if(!user.value.id) {
        next({ name: 'home'});
    } else {
        next();
    }
}