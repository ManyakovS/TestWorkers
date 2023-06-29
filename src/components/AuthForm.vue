<template>
    <form class="auth-form">

        <w-input 
            class="auth-form__input" 
            v-model="email"
            :inputSettings="{ 
                type: 'email', 
                placeholder: 'Электронная почта' 
            }">
        </w-input>

        <w-input 
            class="auth-form__input" 
            v-model="password"
            :inputSettings="{ 
                type: 'password', 
                placeholder: 'Пароль' 
            }">
        </w-input>

        <w-input v-if="type == 'register'"
        class="auth-form__input" 
        v-model="repeatPassword"
        :inputSettings="{ 
            type: 'password', 
            placeholder: 'Повторите пароль' 
        }">
        </w-input>

        <w-button 
            class="auth-form__button" 
            @click.prevent="submit">
            Авторизоваться
        </w-button>

    </form>
</template>

<script setup lang="ts">

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator(value) { return ['register', 'login'].includes(value) }
    }
})

const emit = defineEmits<{
    auth: [{
        email: string,
        password: string
    }],
}>()


import WInput from "../components/UI/Input.vue"
import WButton from "../components/UI/Button.vue"

import { ref } from 'vue'

const email = ref("");
const password = ref("");
const repeatPassword = ref("");

const emptyFields = ref(false);
const passwordsDoNotMatch = ref(false);

const emitAuth = () => {
    emit('auth', {
        email: email.value,
        password: password.value
    })
};

const submit = () => {
    switch (props.type) {
        case "login":
        default:
            
            if (email.value === "" || password.value === "") {
                emptyFields.value = true;
            } 
            else {
                emitAuth()
            }

        break;

        case "register":
            
            if (email.value === "" || password.value === "" || repeatPassword.value === "") {
                emptyFields.value = true;
            }

            else if(password.value != repeatPassword.value)
                passwordsDoNotMatch.value = true;

            else {
                emitAuth()
            }

        break;
    }
}
</script>

<style scoped lang="scss">
.auth-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    &__input {
        margin: 20px 0;
        font-size: 1.5rem;
        line-height: 2rem;
        width: 100%;
    }

    &__button {
        margin: 20px 0;
        width: 80%;
    }
}
</style>