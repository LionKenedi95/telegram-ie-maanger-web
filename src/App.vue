<script setup lang="ts">
import { ref } from 'vue'
import { NConfigProvider, NSpin, NLayout, NLayoutContent, lightTheme, darkTheme } from 'naive-ui'
import { useTelegramTheme } from './compositions/useTelegramTheme'

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

if (!window.isDev && !initData?.user?.allows_write_to_pm) {
  window.Telegram.WebApp.requestWriteAccess()

  Telegram.WebApp.onEvent('writeAccessRequested', (result) => {
    console.log('onEvent writeAccessRequested', result)
  })
}

const startBusinessFlow = () => {
  console.trace('startBusinessFlow')

}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const launchParam = window.isDev ? urlParams.get('startapp') || '' : initData?.start_param || ''
console.log('initData.start_param', initData?.start_param)
console.log('launchParam', launchParam)
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="telegramTheme">
      <n-layout id="app-layout">
        <n-layout-content content-style="padding: 24px;">
          <n-spin :show="isShowLoading">
            <div>
              {{ initData }}
            </div>
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