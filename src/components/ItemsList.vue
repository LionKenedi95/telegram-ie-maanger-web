<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NCard, NGradientText } from 'naive-ui'
import router from '@/router/'
import { RoutesNames } from '@/constants/RoutesNames'
import type { IServiceItem } from '@/interfaces/IServiceItem'
import { useServiceAppointment } from '@/stores/serviceAppointment'

const serviceAppointment = useServiceAppointment()

const title = ref('Услуги')

const items = ref<IServiceItem[]>([
  {
    id: 1,
    title: 'Услуга 1',
    description: 'Описание услуги. Не очень большое, можно ограничить в рамках разумного до 256 символов примерно. Думаю столько достаточно.'
  },
  {
    id: 2,
    title: 'Услуга 2',
    description: 'Описание услуги. Не очень большое, можно ограничить в рамках разумного до 256 символов примерно. Думаю столько достаточно.'
  },
  {
    id: 3,
    title: 'Услуга 3',
    description: 'Описание услуги. Не очень большое, можно ограничить в рамках разумного до 256 символов примерно. Думаю столько достаточно.'
  }
])

const onCreateAppointment = (item: IServiceItem) => {
  serviceAppointment.selectService(item)
  router.push({ name: RoutesNames.appointment, params: { serviceId: item.id }})
}

</script>

<template>
  <div class="items-list">
    <n-gradient-text :size="36">
      {{ title }}
    </n-gradient-text>

    <n-card v-for="item in items" :key="item.id" :title="item.title">
      <div class="mb-2">{{ item.description }}</div>
      <n-button tertiary @click="onCreateAppointment(item)">
        Записаться
      </n-button>
    </n-card>
  </div>
</template>

<style scoped>
</style>
