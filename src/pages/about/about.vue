
<route lang="json5">
{
layout: 'default',
style: {
navigationStyle: 'custom',
navigationBarTitleText: '关于我们',
},
}
</route>
<template>

  <PageLayout navTitle="关于我们">
    <view class="about-page">
      <view class="title">关于我们</view>
      <view class="content">
        北京国炬是一家专注于设备维保与管理的高新技术企业，致力于提供从生产到售后的一体化解决方案。
      </view>
    </view>
  <view class="about-page" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="title">关于我们</view>
    <view class="content">
      武汉鑫宏太电气设备有限公司是一家专业从事电气成套设计、研发、制造、调试及工程安装的一体高新技术型企业。
    </view>
  </view>
  </PageLayout>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
import { ref } from "vue";

const { safeAreaInsets } = uni.getSystemInfoSync()
const navTitle = ref('关于我们')
const backRouteName = ref('BizDeviceView')
</script>

<style lang="scss" scoped>
.about-page {
  padding: 20px;
  line-height: 1.6;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
