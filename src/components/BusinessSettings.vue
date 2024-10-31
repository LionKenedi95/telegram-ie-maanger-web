<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { NGradientText, NButton, NIcon, NFormItem, NInput, NCard, NSpace, NTag, NDivider } from 'naive-ui';
import { Edit16Filled } from '@vicons/fluent'
import { useBusinessStore } from '@/stores/business';

const businessStore = useBusinessStore()
const { business } = storeToRefs(businessStore)
const services = computed(() => business.value?.services || [])

enum Fields {
  companyName = 'companyName'
}

const isFormEdited = ref<null | Fields>(null)
const currentEditingValue = ref('')

const onEdit = (field: Fields) => {
  currentEditingValue.value = business.value[field]
  isFormEdited.value = field
}

const onApplyChange = () => {
  isFormEdited.value = null
}

const onGoToService = (service) => {
  console.log('onGoToService', service)
}

const onGoToCreateService = () => {
  console.log('onGoToCreateService')
}
</script>

<template>
  <div class="business-settings">
    <n-gradient-text :size="36" type="primary">
      Calendee
    </n-gradient-text>

    <div class="editable-field">
      <n-form-item v-if="isFormEdited === Fields.companyName" label="Название компании">
        <n-input
          v-model:value="currentEditingValue"
          type="text"
          placeholder="Название компании"
          maxlength="256"
          autofocus
          @change="onApplyChange()"
        />
      </n-form-item>
      <template v-else>
        <div>{{ business?.companyName }}</div>
        <n-button quaternary circle @click="onEdit(Fields.companyName)">
          <template #icon>
            <n-icon><Edit16Filled /></n-icon>
          </template>
        </n-button>
      </template>
    </div>

    <n-card title="Редактировать услуги">
      <n-space justify="end">
        <n-button v-for="service in services" :key="service.id" type="primary" @click="onGoToService(service)">
          {{ service.title.slice(0, 30) }}
        </n-button>
        <n-button secondary round type="info" @click="onGoToCreateService">
          Добавить услугу +
        </n-button>
      </n-space>
    </n-card>

    <n-gradient-text :size="20" type="primary">
      Последнии события
    </n-gradient-text>

    <n-card title="Добавить новую услугу">
      <n-space vertical>
        <n-space align="center">
          <div>Иванов Иван</div>
          <div>Завтра. 15:00</div>
          <n-tag :bordered="false" type="success">
            Новая запись
          </n-tag>
        </n-space>
        <n-divider />
        <n-space align="center">
          <div>Кенеди Лион</div>
          <div>Завтра. 16:00</div>
        </n-space>
        <n-divider />
        <n-space align="center">
          <div>Виктория</div>
          <div>15 декабря. 10:00</div>
        </n-space>
        <n-divider />
        <n-space align="center">
          <div>Кенеди Лион</div>
          <div>Завтра. 16:00</div>
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<style scoped>
.business-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.business-settings .editable-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
