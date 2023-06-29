<template>
    <button class="button" v-bind:class="buttonClasses">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.button {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: center;
    width: 100%;
    height: 48px;

    /*padding: 12px 41.5px;*/
    border-radius: 15px;
    background-color: rgb(122, 190, 233);
    color: #fff;
    
    transition: all .5s ease-out;
    
    &:hover {
        background-color: rgb(55, 149, 207);
    }
}
</style>