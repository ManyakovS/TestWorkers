<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="workers__pagination">

        <span class="pagination__element"
        :class="i == props.currentPage ? 'pagination__element__selected' : ''" 
        v-for="i in pages" 
        :key="i"
        @click="setCurrentPage(i)">
                {{ i }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { PropType, defineEmits, ref } from "vue"

const emit = defineEmits<{
    setCurrentPage: [page: number]
}>()


const props = defineProps({
    pages: {
        type: Number as PropType<number>,
        required: true
    },
    currentPage: {
        type: Number as PropType<number> | undefined,
        required: true
    }
})

const setCurrentPage = (page: number) => {
    emit('setCurrentPage', page)
}

</script>

<style scoped lang="scss">
.workers__pagination {
    width: fit-content;
    display: flex;
    justify-content: space-between;
    .pagination__element {
        font-size: 1.2rem;
        font-weight: 500;
        background-color: rgba($color: #fafafa, $alpha: .4);
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0,10,2,.1);
        padding: 8px 14px;
        margin: 0 5px;
        cursor: pointer;

        transition: all .15s ease-in;

        &:hover {
            background-color: rgb(136, 195, 232);
            color: #fff;
        }

        &__selected, &__selected:hover {
            background-color: rgb(55, 149, 207);
            color: #fff;
            cursor: default;
        }
    }

}
</style>