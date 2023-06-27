<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="header">
        <nav class="header__navigation">
            <router-link class="navigation__item" to="/workers">
                <p class="info-text">Workers</p>
            </router-link>

            <router-link class="navigation__item" to="/profile">
                <p class="info-text">MyProfile</p>
                <!-- :TODO имя пользователя -->
            </router-link>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<style scoped lang="scss">
.header {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 5vw;
    border-bottom: 2px solid #afafaf;

    .header__navigation {
        width: 14vw;
        display: flex;
        justify-content: space-between;

        .navigation__item {
            color: black;
        }
    }
}
</style>