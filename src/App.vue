<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { lightTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import router from './router/'
import { RoutesNames } from '@/constants/RoutesNames'
import { userApi } from './api/user'

const theme = ref<GlobalTheme>(lightTheme)
router.push(RoutesNames.itemsList)

const initData = window.Telegram.WebApp.initDataUnsafe

// try {
//   initData = JSON.parse(get(window, 'Telegram.WebApp.initData'))
//   console.log('initData', initData)
// } catch (e) {
//   console.error('cant parse init data', e)
// }

const createUser = () => {
  if (!initData?.user) {
    console.error('No user data')
    return
  }

  userApi.create({
    telegramID: initData.user.id,
    language: initData.user.language_code,
    username: initData.user.username,
    firstName: initData.user.first_name,
    lastName: initData.user.last_name,
  })
}

createUser()

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