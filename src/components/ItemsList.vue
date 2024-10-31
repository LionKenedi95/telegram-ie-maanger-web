<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NCard, NGradientText } from 'naive-ui'
import router from '@/router/'
import { RoutesNames } from '@/constants/RoutesNames'
import { useMagazineStore } from '@/stores/magazine'
import type { IService } from '@/interfaces/DTO/Services/Service'

const magazineStore = useMagazineStore()

const title = ref('Услуги')

const items = computed<IService>(() => {
  return magazineStore.services.map((service) => {
    return {
      ...service
    }
  })
})

const onCreateAppointment = (item: IService) => {
  magazineStore.selectService(item)
  router.push({ name: RoutesNames.appointment, params: { serviceId: item.id }})
}

</script>

<template>
  <div class="items-list">
    <n-gradient-text :size="36" type="primary">
      {{ title }}
    </n-gradient-text>

    <n-card v-for="item in items" :key="item.id" :title="item.title">
      <div class="mb-2">{{ item.description }}</div>
      <n-button type="primary" round @click="onCreateAppointment(item)">
        Записаться
      </n-button>
    </n-card>
  </div>
</template>

<style scoped>
</style>
