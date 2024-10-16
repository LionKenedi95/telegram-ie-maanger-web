<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { lightTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import router from './router/'
import { RoutesNames } from '@/constants/RoutesNames'

const theme = ref<GlobalTheme>(lightTheme)
router.push(RoutesNames.itemsList)

</script>

<template>
  <n-config-provider :theme="theme">
    <RouterView />
  </n-config-provider>
</template> 

<style>
@import './assets/main.css';

div#app {
  padding: 12px;
}
</style>
