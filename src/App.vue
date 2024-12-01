<script setup lang="ts">
import { ref } from 'vue'
import { NConfigProvider, NSpin, NLayout, NLayoutContent, lightTheme, darkTheme } from 'naive-ui'
import router from './router/'
import { RoutesNames } from '@/constants/RoutesNames'
import { useTelegramTheme } from './compositions/useTelegramTheme'
import { tryGetApi } from './api/test.api';

const isShowLoading = ref(false)

const theme = ref(window.Telegram.WebApp.colorScheme === 'light' ? lightTheme : darkTheme)
const telegramTheme = useTelegramTheme(window.Telegram.WebApp)

try {
  window.Telegram.WebApp.disableVerticalSwipes()
  window.Telegram.WebApp.expand()
} catch (e) {
  console.error('Cant expand app', e)
}

const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe
const initData = window.Telegram.WebApp.initData || 'user=%7B%22id%22%3A156265751%2C%22first_name%22%3A%22Vadim%22%2C%22last_name%22%3A%22Kenedi%22%2C%22username%22%3A%22lionkenedi%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FKX8FZPwZvtzf3D-tph7AFyZRb1WHXqtnpKxv0CV5R6k.svg%22%7D&chat_instance=3181665580015683702&chat_type=sender&auth_date=1732441636&signature=fKShzWyBc184m-ltVhXJCbPP9oiedowFL-BAAP9e-D7Knr8_PC6UWeswywVO1ZKtXL0jVL2Nc6aHzbr8AftRCg&hash=c64b02beebe09c5459c'

console.log('initDataUnsafe', initDataUnsafe)
console.log('initData', initData)

if (!window.isDev && !initDataUnsafe?.user?.allows_write_to_pm) {
  window.Telegram.WebApp.requestWriteAccess()

  Telegram.WebApp.onEvent('writeAccessRequested', (result) => {
    console.log('onEvent writeAccessRequested', result)
  })
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const launchParam = window.isDev ? urlParams.get('startapp') || '' : initDataUnsafe?.start_param || ''
console.log('initData.start_param', initDataUnsafe?.start_param)
console.log('launchParam', launchParam)

tryGetApi(initData)

if (launchParam.indexOf('showuitest') !== -1) {
  router.push({
    name: RoutesNames.testUI,
  })
}

fetch('https://qpf07h23-3001.euw.devtunnels.ms/api/user', {
  mode: 'cors',
  method: 'PUT',
  body: JSON.stringify({
    "query_id": 'test_queri_id',
    "user": {
        "id": initData?.user?.id || 1,
        "first_name": initData?.user?.first_name,
        "last_name": initData?.user?.last_name,
        "username": initData?.user?.username,
        "language_code": initData?.user?.language_code,
        "is_premium": initData?.user?.is_premium,
        "allows_write_to_pm": initData?.user?.allows_write_to_pm,
        "photo_url": initData?.user?.photo_url
    },
    "auth_date": Date.now(),
    "signature": 'signature',
    "hash": 'hash'
}),
})
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="telegramTheme">
      <n-layout id="app-layout">
        <n-layout-content content-style="padding: 24px;">
          <n-spin :show="isShowLoading">
            <div :style="{ 'line-break': 'anywhere'}">
              {{ initDataUnsafe }}
              <hr>
              {{ initData }}
            </div>

            <router-view />
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
  overflow: hidden;
}

#app-layout {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>