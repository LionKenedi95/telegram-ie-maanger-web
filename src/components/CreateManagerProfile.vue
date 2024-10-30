<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { debounce } from 'lodash';
import { storeToRefs } from 'pinia'
import { NGradientText, NCard, NInput, NButton, NFormItem } from 'naive-ui'
import { useBusinessStore } from '@/stores/business';

const bussinessStore = useBusinessStore()
const { bussiness } = storeToRefs(bussinessStore)

enum Steps {
  start,
  mainInfo,
  serviceInfo,
  end,
}

const step = ref(Steps.start)

if (bussiness.value?.companyName) {
  step.value = Steps.serviceInfo
}

const setNextStep = debounce(() => {
  if (step.value === Steps.start) {
    step.value = Steps.mainInfo
  } else if (step.value === Steps.mainInfo) {
    if (form.name) {
      bussinessStore.updateBusiness({ companyName: form.name })
    }

    step.value = Steps.serviceInfo
  } else if (step.value === Steps.serviceInfo) {
    step.value = Steps.end
  }
}, 10)

const form = reactive({
  name: '',
  serviceName: '',
  serviceDescription: '',
})

const placeholders = {
  service: 'например "Первичная консультация"',
  serviceDescription: 'например "Встреча 1 на 1 чтобы понять в чем проблема"'
}

const focusServiceDescription = () => {
  serviceDescriptionRef.value?.focus()
}
const serviceDescriptionRef = ref<HTMLElement>()

</script>

<template>
  <div class="create-manager-profile">
    <Transition name="fade">
      <div v-if="step === Steps.start" class="step">
        <n-gradient-text :size="36" type="primary">
          Calendee
        </n-gradient-text>

        <div>Telegram менеджер записи клиентов</div>

        <n-button type="primary" round @click="setNextStep()">Начать</n-button>
      </div>

      <div v-else-if="step === Steps.mainInfo" class="step">
        <n-gradient-text :size="20" type="primary">
          Calendee
        </n-gradient-text>

        <n-card title="Укажи название компании">
          <n-input
            v-model:value="form.name"
            type="text"
            placeholder="Название компании"
            maxlength="256"
            autofocus
            @change="setNextStep()"
          />

          <template #footer>
            название будет показано клиенту в заголовке
          </template>

          <template #action>
            <n-button type="primary" round @click="setNextStep()">Дальше</n-button>
          </template>
        </n-card>
      </div>

      <div v-else-if="step === Steps.serviceInfo" class="step">
        <n-gradient-text :size="20" type="primary">
          Calendee
        </n-gradient-text>

        <n-card title="Создадим первую услугу">
          <n-form-item label="Название услуги">
            <n-input
              v-model:value="form.serviceName"
              type="text"
              :placeholder="placeholders.service"
              maxlength="256"
              autofocus
              @change="focusServiceDescription"
            />
          </n-form-item>
          
          <n-form-item label="Описание услуги">
            <n-input
              ref="serviceDescriptionRef"
              v-model:value="form.serviceDescription"
              type="textarea"
              :placeholder="placeholders.serviceDescription"
              maxlength="1024"
              @change="setNextStep()"
            />
          </n-form-item>

          <template #footer>
            Подробные настройки услуг будут дальше
          </template>

          <template #action>
            <n-button type="primary" round @click="setNextStep()">Дальше</n-button>
          </template>
        </n-card>
      </div>

      <div v-else-if="step === Steps.end" class="step">
        <n-gradient-text :size="36" type="primary">
          Calendee
        </n-gradient-text>

        <n-card title="Расписание">
          <p></p>

          <template #footer>
            Подробные настройки услуг будут дальше
          </template>

          <template #action>
            <n-button type="primary" round @click="step = Steps.end">Дальше</n-button>
          </template>
        </n-card>
      </div>
    </Transition>
  </div>
</template>

<style>
.create-manager-profile .step {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  padding-top: 10vh;
  height: calc(100vh - 48px);
  width: calc(100vw - 48px);
}
</style>
