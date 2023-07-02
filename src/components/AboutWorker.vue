<template>
    <div class="about__container" @click.self="close">

        <div v-if="isLoading" class="about__information">
            <button-close @close="close"></button-close>

            <h2 class="about__information__title">{{ information.name }}</h2>

            <div class="information__elements">

                <img class="information__elements__image" :src="information.image" alt="">

                <ul class="information__elements__list">
                    <li class="list__element">
                        Логин: {{ information.login }}
                    </li>

                    <li class="list__element">
                        Электронная почта: {{ information.email }}
                    </li>

                    <li class="list__element">
                        Отдел: {{ information.worker.department }}
                    </li>

                    <li class="list__element">
                        Должность: {{ information.worker.position }}
                    </li>

                    <li class="list__element">
                        Зачислен: {{ information.worker.adopted_at }}
                    </li>
                </ul>
            </div>
            <div class="information__elements__about">
                <h3 >
                    О себе:
                </h3>
                <p class="info-text">
                    {{ information.about }}
                </p>
            </div>


        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router';
import router from '@/router';
import { useAxios } from '@vueuse/integrations/useAxios'
import ButtonClose from './ui/ButtonClose.vue';

const information: any = ref()
const isLoading: Ref<boolean> = ref(false)

onMounted(async () => {
    const route = useRoute();
    information.value = await getInformationAboutWorker(route.params.id.toString())
    isLoading.value = true;

    document.body.style.overflowY = "hidden";
})

onUnmounted(() => {
    document.body.style.overflowY = "auto";
})

const getInformationAboutWorker = async (id: number | string) => {
    try {
        const { data } = await useAxios(`https://test.atwinta.online/api/v1/workers/${id}`,
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

const close = () => {
    router.push('/workers')
}
</script>

<style scoped lang="scss">
.about__container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: .4);
    cursor: pointer;

    .about__information {
        width: 60vw;
        height: 70vh;
        position: relative;
        background-color: #fff;
        top: calc(50% - 70vh / 2);
        left: calc(50% - 60vw / 2);
        border-radius: 20px;
        padding: 2%;
        cursor: auto;
    
        &__title {
            text-align: center;
        }
    
        .information__elements {
            margin-top: 4%;
            display: grid;
            grid-template-columns: 1.2fr 2fr;
            gap: 10px;
    
            &__image {
                width: clamp(250px, 100%, 350px);
                height: clamp(250px, 100%, 350px);
            }
    
            &__list {
                .list__element {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 1.5vh;
                }
            }
    
            &__about {
                margin-top: 1vh;
            }
        }
    
        
    
    }
      
}

</style>