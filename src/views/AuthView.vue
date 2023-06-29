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

        <!-- <div v-else class="card register" v-bind:class="{ error: emptyFields }">
            <h1>Sign Up</h1>
            <form class="form-group">
                <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                <input type="submit" class="btn btn-primary" @click="doRegister">
                <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign
                        in here</a>
                </p>
            </form>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

import AuthForm from '../components/AuthForm.vue'

const formType = ref('login')
const questionsTransitionForms = ref('Нет аккаунта?')
const textTransitionForms = ref('Зарегистрироваться')


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
        console.log('Неверный логин или пароль')
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
        height: 65%;
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