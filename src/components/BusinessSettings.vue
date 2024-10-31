<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { NGradientText, NButton, NIcon, NFormItem, NInput, NCard, NSpace, NTag, NDivider } from 'naive-ui';
import { Edit16Filled } from '@vicons/fluent'
import { useBusinessStore } from '@/stores/business';

const bussinessStore = useBusinessStore()
const { bussiness } = storeToRefs(bussinessStore)

enum Fields {
  companyName = 'companyName'
}

const isFormEdited = ref<null | Fields>(null)
const currentEditingValue = ref('')

const onEdit = (field: Fields) => {
  currentEditingValue.value = bussiness.value[field]
  isFormEdited.value = field
}

const onApplyChange = () => {
  isFormEdited.value = null
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
        <div>{{ bussiness?.companyName }}</div>
        <n-button quaternary circle @click="onEdit(Fields.companyName)">
          <template #icon>
            <n-icon><Edit16Filled /></n-icon>
          </template>
        </n-button>
      </template>
    </div>

    <n-card title="Редактировать услуги">
      <n-space justify="end">
        <n-button secondary type="primary">
          Услуга 1
        </n-button>
        <n-button secondary type="primary">
          Услуга 2
        </n-button>
        <n-button secondary type="primary">
          Все услуги
        </n-button>
      </n-space>
    </n-card>

    <n-card title="Добавить новую услугу">
      <n-space justify="end">
        <n-button secondary type="primary">
          По шаблону
        </n-button>
        <n-button secondary type="primary">
          Свой вариант
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
