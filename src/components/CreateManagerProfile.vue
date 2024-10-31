<script setup lang="ts">
import { reactive, ref } from 'vue'
import { debounce } from 'lodash';
import { storeToRefs } from 'pinia'
import { NGradientText, NCard, NInput, NButton, NFormItem } from 'naive-ui'
import { useBusinessStore } from '@/stores/business';
import router from '@/router';
import { RoutesNames } from '@/constants/RoutesNames';
import { botApi } from '@/api/bot';
import type { IService } from '@/interfaces/DTO/Services/Service';

const bussinessStore = useBusinessStore()
const { bussiness } = storeToRefs(bussinessStore)

enum Steps {
  start,
  mainInfo,
  serviceInfo,
  end,
  howTo,
}

const step = ref(Steps.start)
let firstServiceOfBusiness: IService

if (bussiness.value?.companyName) {
  step.value = Steps.serviceInfo
}
if (bussiness.value?.services.length) {
  step.value = Steps.end
  firstServiceOfBusiness = bussiness.value.services[0]
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
    bussinessStore.createService({
      title: form.serviceName,
      description: form.serviceDescription,
    })
      .then(service => {
        firstServiceOfBusiness = service
      })
    step.value = Steps.end
  } else if (step.value === Steps.end) {
    step.value = Steps.howTo
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

const goToEditServiceSlots = () => {
  router.push({
    name: RoutesNames.timeSlotsSettings
  })
}

const onCopyLink = () => {
  try {
    const link = `https://t.me/ChnnlsManagerBot?startapp=service=${firstServiceOfBusiness.id}`
    navigator.clipboard.writeText(link)
    window.Telegram.WebApp.showConfirm('Ссылка скопирована')
    botApi.firstServiceLink({
      chatId: window.Telegram.WebApp.initDataUnsafe.chat?.id,
      link,
    })

  } catch (e) {
    console.error('Cant copy or show popup', e)
  }

  router.push({
    name: RoutesNames.businessSettings,
  })
}

</script>

<template>
  <div class="create-manager-profile">
    <Transition name="fade">
      <div v-if="step === Steps.start" class="step">
        <n-gradient-text :size="36" type="primary">
          Calendee
        </n-gradient-text>

        <div>Telegram менеджер записи клиентов</div>

        <n-button type="primary" size="large" round @click="setNextStep()">Начать</n-button>
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
          <p>
            Стандартное расписание уже создано. Приемы по 45 минут и перерыв в 15 минут. 5 дней в неделю с 8 утра.
          </p>

          <n-button type="info" round @click="goToEditServiceSlots">Редактировать расписание</n-button>

          <template #footer>
            Ваши клиенты уже могут записываться на прием.
          </template>

          <template #action>
            <n-button type="primary" round @click="onCopyLink">Копировать ссылку для клиентов</n-button>
          </template>
        </n-card>
      </div>

      <div v-else-if="step === Steps.howTo" class="step">
        <n-gradient-text :size="36" type="primary">
          Calendee
        </n-gradient-text>

        <n-card title="Как пользоваться ссылками на услуги и другими функциями?">
          <p>
            Видео уроки помогут Вам настроить разные способы связи с клиентом и выстроить воронки продаж.
          </p>

          <template #footer>
            В сообщество Calendee можно найти ответы на все темы и обсудить с другими предпринимателями как улучшить свою работу.
          </template>

          <template #action>
            <n-button type="primary" round @click="onCopyLink">Группа Calendee</n-button>
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
