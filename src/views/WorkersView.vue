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
import { RouterView } from 'vue-router'
import WorkerCard from '../components/WorkerCard.vue';
import { Ref, ref, Transition, onMounted, watch } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { workerInterface } from '../components/WorkerCard.vue'
import Pagination from '../components/Pagination.vue';

const token = localStorage.getItem('auth_token');
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
    })
    return data
}

const setCurrentPage = async (newPage: number) => {
    currentPage.value = newPage;
    workers.value = (await getWorkers(newPage)).value.data
    window.scroll({
        top: 0,
    });
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