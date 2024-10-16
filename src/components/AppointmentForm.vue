<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NGradientText, NTabs, NTabPane } from 'naive-ui'
import { useServiceAppointment } from '@/stores/serviceAppointment'

const serviceAppointment = useServiceAppointment()
const { selectedService } = storeToRefs(serviceAppointment)
</script>

<template>
  <div class="appointment-form">
    <n-gradient-text :size="36" type="success">
      {{ selectedService.title }}
    </n-gradient-text>

    <n-tabs type="segment" animated>
    <n-tab-pane name="list" tab="Список">
      Список
    </n-tab-pane>
    <n-tab-pane name="calendar" tab="Календарь">
      Календарь
    </n-tab-pane>
  </n-tabs>
  </div>
</template>

<style scoped>
</style>
