<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBusinessStore } from '@/stores/business';

const bussinessStore = useBusinessStore()
const { bussiness } = storeToRefs(bussinessStore)
</script>

<template>
  <div>
    BusinessSettings

    {{ bussiness?.companyName }}
  </div>
</template>
