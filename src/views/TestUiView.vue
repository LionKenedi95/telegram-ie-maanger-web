<template>
  <div>
    <n-space vertical class="appointment-form">
      <n-gradient-text :size="36" type="primary">
        Gradient text
      </n-gradient-text>

      <n-button type="primary">primary</n-button>
      <n-button type="primary" disabled> primary disabled </n-button>
      <n-button type="primary" tertiary> primary tertiary </n-button>
      <n-button type="primary" tertiary disabled> primary tertiary disabled </n-button>

      <n-button type="error">primary</n-button>
      <n-button type="error" disabled> primary disabled </n-button>
      <n-button type="error" tertiary> primary tertiary </n-button>
      <n-button type="error" tertiary disabled> primary tertiary disabled </n-button>

      <n-tabs type="segment" animated>
        <n-tab-pane name="list" tab="Список">
          <n-collapse>
            <n-collapse-item title="Завтра" name="2">
              <div class="d-flex">
                Collapse Item
              </div>
            </n-collapse-item>
            <n-collapse-item title="18 октября" name="3">
              <div class="d-flex">
                Collapse Item
              </div>
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>

        <n-tab-pane name="calendar" tab="Календарь">
          Календарь
        </n-tab-pane>
      </n-tabs>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { NGradientText, NTabs, NTabPane, NCollapse, NCollapseItem, NButton, NSpace } from 'naive-ui'
</script>

<style lang="scss" scoped>
</style>