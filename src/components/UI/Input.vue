<template>
    <input v-model="text" :type="inputSettings.type" class="input" :placeholder="inputSettings.placeholder" required
        @change="updateModelValue">
</template>

<script setup lang="ts">

import { PropType, Ref, ref } from 'vue'
export interface inputInterface {
    type: "text" | "email" | "password",
    placeholder: string

}

defineProps({
    inputSettings: {
        type: Object as PropType<inputInterface>,
        required: true,
    }
})

const emit = defineEmits<{
    'update:modelValue': [text: string]
}>()

const text: Ref<string> = ref('');

const updateModelValue = () => {
    emit('update:modelValue', text.value)
}
</script>

<style scoped>
.input {
}
</style>