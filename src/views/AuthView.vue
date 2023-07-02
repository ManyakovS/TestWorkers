<template>
    <div class="login-page">
        <div class="card">
            <h1>Авторизация</h1>

            <auth-form :type="formType" @auth="auth"></auth-form>

            <div class="from-hints">
                <p class="hints">{{ questionsTransitionForms }}
                    <a href="#" @click="switchForm()">
                        {{ textTransitionForms }}
                    </a>
                </p>
                <p class="hints"><a href="#">Забыли пароль?</a></p>
            </div>
        </div>

        <notification v-model="isShowNotification" :notification="{title: 'Ошибка авторизация', text: 'Неверный логин или пароль', time: 2500}"></notification>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

import AuthForm from '../components/AuthForm.vue'
import Notification from '../components/ui/Notification.vue'

const formType = ref('login')
const questionsTransitionForms = ref('Нет аккаунта?')
const textTransitionForms = ref('Зарегистрироваться')

const isShowNotification = ref(false);


const switchForm = () => {
    if(formType.value == 'login'){
        formType.value = 'register'
        textTransitionForms.value = "Авторизоваться"
        questionsTransitionForms.value = "Уже имеется аккаунт?"
    }
    else {
        formType.value = 'login'
        textTransitionForms.value = "Зарегистрироваться"
        questionsTransitionForms.value = "Нет аккаунта?"
    }
}

const signIn = async (email: string, password: string) => {
    try {
        const {data} = await useAxios(`https://test.atwinta.online/api/v1/auth/login?email=${email}&password=${password}`,
          {
            method: 'POST'
          }
        )
        return data
    }
    catch {
        return 500
    }

}

const auth = async (authObjet: {email: string, password: string}) => {

    const res = await signIn(authObjet.email, authObjet.password)
    if(res != 500) {
        localStorage.setItem('auth_token', res.value.token)
        localStorage.setItem('isAuthenticated', 'true')
    
        router.push('workers')
    }
    else {
        isShowNotification.value = true;
    }


}

/* const registerActive = ref(false); */

</script>

<style scoped lang="scss">

.login-page {
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: clamp(550px, 65%, 650px);
        width: 40%;
    
        padding: 3%;
        background-color: rgba($color: #fafafa, $alpha: .4);
        border-radius: 20px;
        box-shadow: 0 2px 12px 0 rgba(0,10,2,.1);
        .from-hints {
            width: 100%;

            .hints {
                margin: 5px 0;

                a {
                    color: rgb(55, 149, 207);
                }
            }
        }
    }
    

}
</style>