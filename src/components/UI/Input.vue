<template>
    <div>
        <label 
            v-if="labelSettings.isShow"
            class="label" >
            {{ labelSettings.text }}
        </label>

        <input 
            v-model="text" 
            :class="[isTouched && !isValid.value ? 'error': '', props.class]"
            :type="inputSettings.type" 
            :placeholder="inputSettings.placeholder" 
            required
            @change="updateModelValue" 
            @focusout="touched"
        >
        <small v-if="isTouched && text.length == 0">Обязательное поле</small>
        <small v-else-if="isTouched && !isValid.value">{{ isValid.text }}</small>
    </div>

</template>

<script setup lang="ts">

import { computed, onMounted, PropType, Ref, ref } from 'vue'
export interface labelInterface {
    isShow: boolean,
    text: string
}

export interface inputInterface {
    type: "text" | "email" | "password" | "date",
    placeholder: string,
}

const props = defineProps({
    inputSettings: {
        type: Object as PropType<inputInterface>,
        required: true,
    },
    labelSettings: {
        type: Object as PropType<labelInterface>,
        required: false,
        default() {
            return {
                isShow: false,
                text: '',
            }
        }
    },
    class: {
        type: String,
        required: false,
        default: 'input'
    },
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits<{
    'update:modelValue': [text: string]
}>()

const text: Ref<string> = ref('');

const updateModelValue = () => {
    emit('update:modelValue', text.value)
}

const isTouched = ref(false);

const touched = () => {
    isTouched.value = true
}




let isValid = computed(() => {
    return {
        value: true,
        text: ''
    }
});

onMounted(() => {
    switch (props.inputSettings.type) {
        default:
            case 'text':
            text.value = props.modelValue

            break;

        case 'email':
            text.value = props.modelValue
            isValid = computed(() => {
                return {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text.value),
                    text: 'Некорректный адрес электронной почты'
                }
            })
            break;
        case 'password':
            text.value = props.modelValue
            isValid = computed(() => {
                return {
                    value: text.value.length > 8,
                    text: 'Длина пароля должна быть больше 8 символов'
                }
            })
            break;
        case 'date':
            text.value = new Date(props.modelValue).toLocaleDateString('en-CA');
            isValid = computed(() => {
                return {
                    value: text.value.length > 8,
                    text: 'Длина пароля должна быть больше 8 символов'
                }
            })
            break;
    }
})




</script>

<style scoped>
.label {
    font-size: 1.25rem;
    padding-left: 15px;
}

input {
    padding: 4px 4px 4px 8px; 
    width: 100%;
}

input::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-text {
  display:none;
}

small {
    padding-left: 10px ;
    color: red;
}

.error {
    min-height: 42px;
    border: 1px solid red;

    color: red
}
</style>