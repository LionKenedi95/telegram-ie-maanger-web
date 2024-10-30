<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { NGradientText, NInput, NButton } from 'naive-ui'
import { useBusinessStore } from '@/stores/business';

const bussinessStore = useBusinessStore()
const { bussiness } = storeToRefs(bussinessStore)

enum Steps {
  start,
  mainInfo,
  serviceInfo
}

const step = ref(Steps.start)

const form = reactive({
  name: '',
  serviceName: '',
  serviceDescription: '',
})

const placeholders = {
  service: 'например "Первичная консультация"',
  serviceDescription: 'например "Встреча 1 на 1 чтобы понять в чем проблема"'
}

</script>

<template>
  <div class="create-manager-profile">
    <div v-if="step === Steps.start" class="step">
      <n-gradient-text :size="36" type="primary">
        Calendee
      </n-gradient-text>

      <div>Telegram менеджер записи клиентов</div>

      <n-button type="primary" round @click="step = Steps.mainInfo">Начать</n-button>
    </div>

    <div v-else-if="step === Steps.mainInfo" class="step">
      <n-gradient-text :size="24" type="primary">
        Основная информация
      </n-gradient-text>

      <div>Укажи название компании, оно будет показано клиенту в заголовке</div>

      <n-input
        v-model:value="form.name"
        type="text"
        placeholder="Название компании"
        @change="step = Steps.serviceInfo"
      />

      <n-button type="primary" round @close="step = Steps.serviceInfo">Дальше</n-button>
    </div>

    <div v-else-if="step === Steps.serviceInfo" class="step">
      <n-gradient-text :size="24" type="primary">
        Добавление услуги
      </n-gradient-text>

      <div>Как называется услуга на которую будет записываться клиент?</div>

      <n-input
        v-model:value="form.serviceName"
        type="text"
        :placeholder="placeholders.service"
      />

      <div>Добавь краткое описание, если надо</div>

      <n-input
        v-model:value="form.serviceDescription"
        type="textarea"
        :placeholder="placeholders.serviceDescription"
      />

      <n-button type="primary" round @close="step = Steps.serviceInfo">Дальше</n-button>
    </div>
  </div>
</template>

<style>
.create-manager-profile .step {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 48px);
  width: calc(100vw - 48px);
}
</style>
