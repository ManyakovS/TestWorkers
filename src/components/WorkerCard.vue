<template>
    <div class="worker__card">

        <img class="card__img" :src="worker.image" :alt="`image-${worker.login}`">

        <h3 class="card__name">{{ worker.name }}</h3>
        
        <router-link class="card__link" :to="`/workers/${worker.id}/about`">
            <h3 >Открыть карточку</h3>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "vue"

export interface workerInterface {
    id: number,
    login: string,
    name: string,
    email: string,
    image: string
}

defineProps({
    worker: {
        type: Object as PropType<workerInterface>,
        required: true
    }
})
</script>

<style scoped lang="scss">
.worker__card {            
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 15px;
    width: 100%;
    height: 55vh;
    background-color: rgba($color: #fafafa, $alpha: .4);
    border-radius: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,10,2,.1);

    .card__img {
        border-radius: 10px;
        object-fit: contain;
        width: clamp(150px, 90%, 300px);
    } 

    .card__name {
        margin: 1vh 0 0 0;
        width: 80%;
        text-align: center;
    }

    .card__link {
        margin-top: auto;
        color: rgb(55, 149, 207);
        transition: all .3s ease-in-out;

        &:hover {
            color: rgb(12, 110, 170);
            opacity: .8;
        }
    }
}
</style>