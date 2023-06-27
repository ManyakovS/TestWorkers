<template>
    
    <div class="workers">
        <div class="workers__list" v-if="isLoading" >

            <worker-card 
                v-for="worker in workers" 
                :key="worker.id" 
                :worker="worker">
            </worker-card>

        </div>

        <pagination class="workers__pagination" 
            v-if="isLoading" 
            :pages="lastPage" 
            :current-page="currentPage" 
            @set-current-page="setCurrentPage">
        </pagination>

        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WorkerCard from '../components/WorkerCard.vue';
import { Ref, ref, Transition, onMounted, watch } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { workerInterface } from '../components/WorkerCard.vue'
import Pagination from '../components/Pagination.vue';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhODI0MDEyMzAwY2E1NzdhOGY1MzMwNmU4MjliYmE5MTBhMTIzNGQyODFiZDQzZGZiMGEzYTEzNjM4M2M2ZGNjODZmNjAzNzM3ZDdiNDE0In0.eyJhdWQiOiIzIiwianRpIjoiZWE4MjQwMTIzMDBjYTU3N2E4ZjUzMzA2ZTgyOWJiYTkxMGExMjM0ZDI4MWJkNDNkZmIwYTNhMTM2MzgzYzZkY2M4NmY2MDM3MzdkN2I0MTQiLCJpYXQiOjE2ODc4NTc3MDIsIm5iZiI6MTY4Nzg1NzcwMiwiZXhwIjoxNzE5NDgwMTAyLCJzdWIiOiIzNjciLCJzY29wZXMiOltdfQ.Z3JA6Ktal0dVCRGgKU2uafZDyoQ64I8gvN2sD32fOjk4jHOoL8kGeEaM0VYQiFXwd4CuGeQqXWhK7EWnIvMTb3jUle_lUTbznVRFy_91vhjBd-218wdLZsTOmYqYvllN4BNXwT8Xz_So0ZqoOubcKm3UJT01f_DYalr-_w98D_cScqKGEq4CHuwImoSV2o92ixHcHBHmdpWCy5mbTimPFs3rp4PMU6vJBxRW7JzRb0swjKVoz_kz7XuIW78avfWAsxCgRXMIjQ9zs8KwicYS5c9NC3UWamMGfLfaPmfmp1SzFkwvaG0asBXCrPJaUK6r_W2qHF-7EfBrXLivrPTBFCAbW_8GPG0KvY8CMAICp8e7qnK6G0BGzTKChIirsg40GleGY3aMfUGPfz30rhVBaoXrn_SdP4O9HCmeZomTlzuxao-SBRDHvM697FGIOZtUxtAjyEjZAOQeNJfJzdDQLeFcVKYoyM3cKOWS2l7wGQYgR73yBTsNNtbjOSlmvMKiK913OJ-VPKjJrOdHjQ9rgacUMmRTEzpQ0KFYeMKqcBA4O4jw-CorioXy2M9h3OMQpXAG1BEWUlm2TjxSF_EheyfNHwnpsC3SUiJu8WYTkbecg1jZQy-ykGMYo2kRUq_dIIxcqTap_ZfPQLsleEloddLgy3s2UyvFbAKMqviyHXc'
let workers: Ref<[workerInterface]> = ref([]);
const isLoading = ref(false);
const lastPage = ref(0);
const currentPage = ref(1);


const getWorkers = async (page: number) => {
    const { data } = await useAxios(`https://test.atwinta.online/api/v1/workers?page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    )
    return data
}

const setCurrentPage = async (newPage: number) => {
    currentPage.value = newPage;
    workers.value = (await getWorkers(newPage)).value.data
}

onMounted(async () => {
    const response = (await getWorkers(currentPage.value)).value
    workers.value = response.data
    lastPage.value = response.last_page
    isLoading.value = true
})

</script>

<style scoped lang="scss">
.workers {
    padding: 5vh 0 10vh 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .workers__list {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

    .workers__pagination {
        margin-top: 4vh;   
    }
    

}


.v-enter-active {
    transition: opacity .6s ease;
}

.v-leave-active {
    transition: opacity .3s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>