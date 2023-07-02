<template>
    <transition>
        <div v-if="modelValue" class="notification-default" :class="[props.class]">
            <button-close @close="close"></button-close>
            <h3 class="title">
                {{ notification.title }}
            </h3>
            <p class="description"> {{ notification.text }}</p>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { PropType, watch } from 'vue';
import ButtonClose from './ButtonClose.vue';

export interface notificationInterface {
    title: string,
    text: string,
    time: number

}

const props = defineProps({

    class: {
        type: String,
        required: false,
        default: 'notification'
    },
    notification: {
        type: Object as PropType<notificationInterface>,
        required: true,
        default() {
            return {
                title: '',
                text: '',
                time: 2500
            }
        }
    },
    modelValue: {
        type: Boolean,
        required: true
    }
})

watch(
    () => props.modelValue,
    () => {
        setTimeout(() => {
            emit('update:modelValue', false)
        }, props.notification.time)
    },
    { deep: true }
)

const close = () => {
    emit('update:modelValue', false)
}


const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()


</script>

<style scoped lang="scss">
.notification-default {
    padding: 10px 15px;
    position: fixed;
    top: 50px;
    right: 50px;
    min-width: 340px;
    min-height: 120px;
    border-radius: 20px;
}

.notification {
    background-color: #fff;
    box-shadow: 2px 2px 10px 2px rgba(0, 10, 2, .1);

    .title {
        margin-bottom: .25rem;
    }
}


.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>