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
// const initData = {
//     "query_id": "AAEXbVAJAAAAABdtUAlvqn_h",
//     "user": {
//         "id": 156265751,
//         "first_name": "Vadim",
//         "last_name": "Kenedi",
//         "username": "lionkenedi",
//         "language_code": "ru",
//         "allows_write_to_pm": true
//     },
//     "auth_date": "1729439830",
//     "hash": "0aec2944e6c7234c43a1d87231efae1c4b28449178643a5feaececd112f0a3ce"
// }

console.log('initData', initData)

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