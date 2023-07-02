<template>
    <div class="vue-select" @click="toggleDropdown" v-on-click-outside="closeDropdown">
        <span class="selected-option">{{ showSelected }}</span>
        <transition name="slide">
            <div class="dropdown-options-container" v-show="showDropdown">
                <div class="dropdown-options" v-for="(option, i) in options" :key="i"
                    v-bind:class="{ 'selected': option === selected }">
                    <div class="dropdown-options--cell" @click="selectOption(option)">
                        <span class="option-text">{{ option }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
interface optionsInterface {
    [key: string]: string;
}

const props = defineProps({
    selected: {
        type: String,
        required: false
    },
})

const emit = defineEmits<{
    'interface': [text: string]
}>()


const showSelected = ref("");
const showDropdown = ref(false);
const options:optionsInterface = {
    'front': "Frontend",
    'back': "Backend"
}


const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
    showDropdown.value = false;
}


const selectOption = (option: string) => {
    showSelected.value = option;
    emit('interface', showSelected.value)
};

onMounted(() => {
    if (props.selected != undefined)
        showSelected.value = options[props.selected]
})


</script>

<style scoped lang="scss">
.vue-select {
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
    transition: all 200ms linear;
    position: relative;
    font-size: 1.4rem;

    .selected-option {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        padding: 8px;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        transition: all 200ms linear;

        &:hover {
            color: rgba(0, 0, 0, 0.45);
        }

        .selected-option svg {
            fill: #42b883;
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            transition: fill 300ms linear;

            &:hover {
                fill: #2e805b;
            }
        }

    }
}

.dropdown-options-container {
    height: auto;
    position: absolute;
    background: #fff;
    width: 100%;

    .dropdown-options--cell {
        padding: 8px;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            background-color: #f4fbf8;
            border: none;
        }
    }
}

.dropdown-options.selected .dropdown-options--cell {
    background-color: #f4fbf8;
    border: none;
}

.slide-enter-active,
.slide-leave-active {
    transition: height 50ms ease;
}

.slide-enter,
.slide-leave-to {
    height: 0px;
    opacity: 0;
}
</style>