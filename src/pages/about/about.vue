<route lang="json5">
{
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view class="about-page" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="title">关于我们</view>
    <view class="content">
      北京国炬是一家专注于设备维保与管理的高新技术企业，致力于提供从生产到售后的一体化解决方案。
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
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
