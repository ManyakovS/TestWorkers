<template>
    <span class="close" @click="close" />
</template>

<script setup lang="ts">
const emit = defineEmits<{
    'close': [value: boolean]
}>()

const close = () => {
    emit("close", true);
}
</script>

<style lang="scss">
.close {
    position: absolute;
    right: 16px;
    top: 16px;
    width: 16px;
    height: 16px;
    opacity: 0.3;
    transition: all .3s ease-in;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    &:before,
    &:after {
        position: absolute;
        left: 8px;
        content: ' ';
        height: 16px;
        width: 2px;
        background-color: #333;
    }

    &:before {
        transform: rotate(45deg);
    }

    &:after {
        transform: rotate(-45deg);
    }
}
</style>