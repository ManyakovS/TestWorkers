<template>
  <div>
    <header-component></header-component>

    <div class="wrapper">
      <router-view/>
    </div>
    
  </div>

</template>

<script setup lang="ts">
import HeaderComponent from './components/Header.vue';
import { RouterView } from 'vue-router'
</script>


<style scoped lang="scss">
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    height: 94vh;
  }
</style>
