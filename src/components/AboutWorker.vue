<template>
    <div class="about__container" @click="close">

        <div class="about__information">
            agsdgsgsdggd
        </div>

    </div>
</template>

<script setup lang="ts">
import router from '@/router';

const close = () => {
    router.push('/workers')
}

</script>

<style scoped lang="scss">
.about__container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: .4)
}

.about__information {
    width: 50vw;
    height: 60vh;
    position: absolute;
    background-color: #fff;
    top: calc(50% - 60vh / 2);
    left: calc(50% - 50vw / 2);
    border-radius: 20px;
}

</style>