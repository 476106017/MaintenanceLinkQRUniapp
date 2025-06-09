<route lang="json5" type="page">
{
layout: 'default',
style: {
navigationBarTitleText: '工作台',
navigationStyle: 'custom',
disableScroll: true, // 微信禁止页面滚动
'app-plus': {
bounce: 'none', // 禁用 iOS 弹性效果
},
},
}
</route>

<template>
  <PageLayout navTitle="工作台" backRouteName="index" routeMethod="pushTab">
    <view
      class="wrap"
      :style="{
        '--nav-height': `${statusBarHeight + navHeight}px`,
        '--status-bar-height': `${statusBarHeight}px`,
      }"
    >
      <wd-tabs :customClass="getClass()" v-model="tabActive">
        <template v-for="(item, index) in tabList" :key="index">
          <wd-tab :title="item.title" :name="item.key">
            <dragList v-if="item.key === '1'"></dragList>
            <bigScreenList v-if="item.key === '2'"></bigScreenList>
          </wd-tab>
        </template>
      </wd-tabs>
    </view>
  </PageLayout>
</template>

<script lang="ts" setup>
import bigScreenList from './components/bigScreenList.vue'
import dragList from './components/dragList.vue'
import { platform, isMp } from '@/utils/platform'
defineOptions({
  name: 'workHome',
  options: {
    styleIsolation: 'shared',
  },
})
import { ref } from 'vue'
const globalData = getApp().globalData
const { systemInfo, navHeight } = globalData
const { statusBarHeight } = systemInfo
console.log('systemInfo:::', systemInfo)
const tabList = ref([
  { key: '1', title: '仪表盘' },
  { key: '2', title: '大屏' },
  // { key: '3', title: 'Online' },
])
const tabActive = ref<string>('1')
const getClass = () => {
  return `${platform} ${isMp ? 'mp' : ''}`
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
}
:deep(.wd-tabs) {
  height: 100%;
  display: flex;
  flex-direction: column;
  &.mp {
    .wd-tabs__nav-container {
      padding-right: 7%;
    }
  }
  .wd-tabs__nav {
    background: #eee;
    .wd-tabs__nav-item {
      //color: #fff;
    }
  }
  .wd-tabs__container {
    flex: 1;
    width: 100%;
  }
  .wd-tabs__body {
    position: relative;
  }
  .wd-tabs__line {
    //background-color: #fff;
  }
}
:deep(.wd-tab) {
  .wd-tab__body {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style>
