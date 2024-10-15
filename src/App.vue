<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { lightTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const theme = ref<GlobalTheme>(lightTheme)
</script>

<template>
  <n-config-provider :theme="theme">
    <RouterView />
  </n-config-provider>
</template> 

<style scoped>
</style>
