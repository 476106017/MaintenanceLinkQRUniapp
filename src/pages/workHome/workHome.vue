<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '工作台',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <BizDeviceList />
</template>
<script lang="ts" setup>
import BizDeviceList from '../qr/BizDeviceList.vue'

defineOptions({
  name: 'workHome',
  options: {
    styleIsolation: 'shared',
  },
})
</script>
