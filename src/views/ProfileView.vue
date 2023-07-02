<template>
  <div class="profile">
    <h2 class="profile__title">Профиль</h2>
    <form class="profile-form" v-if="isLoading">

      <div class="profile-form__group-of-one">
        <w-input v-model:model-value="aboutUser.name" class="profile-input" :label-settings="{ isShow: true, text: 'Ваше имя' }"
          :input-settings="{ type: 'text', placeholder: 'Имя' }"></w-input>
      </div>

      <div class="profile-form__group-of-two">
        <w-input v-model="aboutUser.email" class="profile-input" :label-settings="{ isShow: true, text: 'Email' }"
          :input-settings="{ type: 'email', placeholder: 'email@mail.ru' }"></w-input>

          <w-input v-model="aboutUser.phone" class="profile-input" :label-settings="{ isShow: true, text: 'Номер телефона' }"
          :input-settings="{ type: 'text', placeholder: '+78889997766 ' }"></w-input>
      </div>

      <div class="profile-form__group-of-two">
        <w-input  v-model="aboutUser.city" class="profile-input" :label-settings="{ isShow: true, text: 'Город' }"
          :input-settings="{ type: 'email', placeholder: 'Город' }"></w-input>

          <w-input  v-model="aboutUser.birthday" class="profile-input" :label-settings="{ isShow: true, text: 'Год рождения' }"
          :input-settings="{ type: 'date', placeholder: '2000' }"></w-input>
      </div>

      <div class="profile-form__group-of-one">
        <w-select :selected="aboutUser.type"></w-select>
      </div>

      <div class="profile-form__group-of-two">
        <w-input v-model="aboutUser.github" class="profile-input" :label-settings="{ isShow: true, text: 'Ссылка на проект' }"
          :input-settings="{ type: 'email', placeholder: 'Ссылка на github проект' }"></w-input>

          <w-input v-model="aboutUser.telegram" class="profile-input" :label-settings="{ isShow: true, text: 'Telegram' }"
          :input-settings="{ type: 'text', placeholder: 'Ваш telegram' }"></w-input>
      </div>

      <div class="profile-form__group-of-one">
        <w-input  v-model="aboutUser.about" class="profile-input" :label-settings="{ isShow: true, text: 'Расскажите о себе' }"
          :input-settings="{ type: 'text', placeholder: 'Расскажите о себе' }"></w-input>
      </div>

      <div class="profile-form__group-buttons">
        <w-button class="button">Сохранить</w-button>
        <w-button class="button" @click="exit">Выйти</w-button>
      </div>



    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useAxios } from '@vueuse/integrations/useAxios'
import { useRouter } from 'vue-router'
const router = useRouter()
import WInput from "@/components/ui/Input.vue";
import WButton from "@/components/ui/Button.vue";
import WSelect from "@/components/ui/Select.vue"

const aboutUser: Ref<any> = ref()
const isLoading = ref(false);

const getAboutUser = async () => {
  try {
    const { data } = await useAxios('https://test.atwinta.online/api/v1/user',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        }
      })

    return data.value
  } catch (error) {

    return 500
  }
}

const exit = () => {
  localStorage.removeItem('auth_token')
  router.push('/auth')
}


onMounted(async () => {
  aboutUser.value = await getAboutUser();
  isLoading.value = true
  console.log(aboutUser)
})
</script>

<style lang="scss">
.profile {
  
  &__title {
    text-align: center;
  }

  .profile-form {
    display: flex;
    flex-direction: column;
    width: 34vw;
    margin: 2vh auto 0 auto;
    box-shadow: 0 2px 12px 0 rgba(0,10,2,.1);
    padding: 2%;
    border-radius: 16px;

    &__group-of-one,
    &__group-of-two {
      margin: 1vh 0;

      .profile-input {
        height: 40px;
        font-size: 1.25rem;
        margin: 4px 0;
        border: 1px solid rgba($color: #000000, $alpha: .1); 
        border-radius: 6px;
      }

      .label {
        padding-left: 8px;
      }
    }

    &__group-of-two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    &__group-buttons {
      display: flex;
      width: 50%;
      margin-top: 4vh;


      .button {
        margin-right: 20px;
      }
    }




  }
}
</style>