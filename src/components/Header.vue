<template>
    <header class="header">
        <nav class="header__navigation">
            <router-link class="navigation__item" to="/workers">
                <p class="info-text">Работники</p>
            </router-link>

            <router-link class="navigation__item" to="/profile">
                <p class="info-text">Мой профиль</p>
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
    height: 6vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 5vw;
    border-bottom: 2px solid #afafaf;

    .header__navigation {
        display: flex;
        justify-content: space-between;

        .navigation__item {
            margin: 0 2vw;
            color: black;
            transition: all .3s ease-in-out;

            &:hover {
                color: rgb(19, 19, 19);
                opacity: 0.8;
            }
        }


    }
}
</style>