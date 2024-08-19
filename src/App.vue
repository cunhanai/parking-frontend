<script setup>
  import { RouterView } from 'vue-router'
  import NavbarView from './components/NavbarView.vue'
</script>

<template>
  <BToastOrchestrator />
  <NavbarView />

  <RouterView />
</template>
