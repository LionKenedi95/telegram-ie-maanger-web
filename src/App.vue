<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { NConfigProvider, NSpin, NLayout, NLayoutContent, lightTheme, darkTheme } from 'naive-ui'
import router from './router/'
import { RoutesNames } from '@/constants/RoutesNames'
import { useTelegramTheme } from './compositions/useTelegramTheme'
import { useBusinessStore } from '@/stores/business';
import { businessesApi } from './api/businesses'

const businessStore = useBusinessStore()

const isShowLoading = ref(true)

const theme = ref(window.Telegram.WebApp.colorScheme === 'light' ? lightTheme : darkTheme)
const telegramTheme = useTelegramTheme(window.Telegram.WebApp)

try {
  window.Telegram.WebApp.disableVerticalSwipes()
  window.Telegram.WebApp.expand()
} catch (e) {
  console.error('Cant expand app', e)
}

const initData = window.Telegram.WebApp.initDataUnsafe

console.log('initData', initData)

const startBusinessFlow = () => {
  businessesApi.check({
    telegramID: initData?.user?.id || 1,
    language: initData?.user?.language_code || 'ru',
    username: initData?.user?.username || 'test',
    firstName: initData?.user?.first_name || 'Тестов',
    lastName: initData?.user?.last_name || 'Тест',
  })
    .then((result) => {
      console.log('bussinessApi.check result', result)

      if (result) {
        businessStore.setBussiness(result)
        router.push({
          name: RoutesNames.createManagerProfile,
        })
      }
    })
    .finally(() => {
      isShowLoading.value = false
    })
}

if (initData.start_param?.indexOf('service') === 0) {
  const serviceID = initData.start_param.split('|')[0]?.split('=')

  if (serviceID) {
    businessesApi.getServices({
    businessID: 1,
    serviceIDs: [serviceID],
  })
    .then((result) => {
      console.log('getServices result', result)
    })
  } else {
    startBusinessFlow()
  }
} else {
  startBusinessFlow()
}
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="telegramTheme">
      <n-layout id="app-layout">
        <n-layout-content content-style="padding: 24px;">
          <n-spin :show="isShowLoading">
            <RouterView />
          </n-spin>
        </n-layout-content>
      </n-layout>
  </n-config-provider>
</template> 

<style>
@import './assets/main.css';

#app {
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
}

#app-layout {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>