<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { NGradientText, NTabs, NTabPane, NCollapse, NCollapseItem, NButton } from 'naive-ui'
import { useServiceAppointment } from '@/stores/serviceAppointment'

const serviceAppointment = useServiceAppointment()
const { selectedService } = storeToRefs(serviceAppointment)

interface IServiceSlot {
  time: string
  disabled: boolean
}

const timeSlots = ref<IServiceSlot[]>([{
  time: '10:00',
  disabled: false,
},{
  time: '11:00',
  disabled: false,
}, {
  time: '12:00',
  disabled: true,
}, {
  time: '13:00',
  disabled: false,
}])
</script>

<template>
  <div class="appointment-form">
    <n-gradient-text :size="36" type="success">
      {{ selectedService.title }}
    </n-gradient-text>

    <n-tabs type="segment" animated>
    <n-tab-pane name="list" tab="Список">
      <n-collapse>
        <n-collapse-item title="Сегодня" name="1">
          <div class="d-flex">
            <n-button
              v-for="timeSlot in timeSlots"
              :key="timeSlot.time"
              :type="timeSlot.disabled ? 'error' : 'primary'"
              :disabled="timeSlot.disabled"
              tertiary
            >
              {{ timeSlot.time }}
            </n-button>
          </div>
        </n-collapse-item>
        <n-collapse-item title="Завтра" name="2">
          <div class="d-flex">
            <n-button
              v-for="timeSlot in timeSlots"
              :key="timeSlot.time"
              :type="timeSlot.disabled ? 'error' : 'primary'"
              :disabled="timeSlot.disabled"
              tertiary
            >
              {{ timeSlot.time }}
            </n-button>
          </div>
        </n-collapse-item>
        <n-collapse-item title="18 октября" name="3">
          <div class="d-flex">
            <n-button
              v-for="timeSlot in timeSlots"
              :key="timeSlot.time"
              :type="timeSlot.disabled ? 'error' : 'primary'"
              :disabled="timeSlot.disabled"
              tertiary
            >
              {{ timeSlot.time }}
            </n-button>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-tab-pane>

    <n-tab-pane name="calendar" tab="Календарь">
      Календарь
    </n-tab-pane>
  </n-tabs>
  </div>
</template>

<style scoped>
</style>
