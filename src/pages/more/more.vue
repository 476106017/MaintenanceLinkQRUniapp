<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '更多',
    navigationStyle: 'custom',
    disableScroll: true, // 微信禁止页面滚动
    'app-plus': {
      bounce: 'none', // 禁用 iOS 弹性效果
    },
  },
}
</route>

<template>
  <PageLayout navTitle="更多" backRouteName="index" routeMethod="pushTab">
    <wd-cell-group border clickable style="overflow:auto;">
      <template v-for="(item, index) in routeList" :key="index">
        <wd-cell :title="item.title" is-link @click="goPage(item)">
          <template #icon>
            <wd-img
              height="20"
              width="20"
              :src="isLocalConfig ? item.icon : getFileAccessHttpUrl(item.icon)"
            ></wd-img>
          </template>
        </wd-cell>
      </template>
    </wd-cell-group>
  </PageLayout>
</template>

<script lang="ts" setup>
import { us, os } from '@/common/work'
import { cache, getFileAccessHttpUrl } from '@/common/uitls'
import {
  ACCESS_TOKEN,
  USER_NAME,
  USER_INFO,
  APP_ROUTE,
  APP_CONFIG,
  HOME_CONFIG_EXPIRED_TIME,
} from '@/common/constants'
import { http } from '@/utils/http'
import { onLaunch, onShow, onHide, onLoad, onReady } from '@dcloudio/uni-app'
import { useToast, useMessage, useNotify } from 'wot-design-uni'
import { useRouter } from '@/plugin/uni-mini-router'
//
const toast = useToast()
const router = useRouter()
const routeList = ref([])
const isLocalConfig = getApp().globalData.isLocalConfig
let type = 'common'

const init = () => {
  console.log('more页面：init', type)
  if (isLocalConfig) {
    routeList.value = type == 'common' ? us.data : os.data
  } else {
    var indexRouteList = cache(APP_ROUTE)
    routeList.value = indexRouteList.filter((item) => item.type == type)
  }
}
const goPage = (item) => {
  let page = item.routeIndex
  console.log('-----------page------------', page)
  if (!page) {
    toast.info('该功能暂未实现')
  } else {
    if (page.indexOf('/app/online') == 0) {
      let code = page.substring(page.lastIndexOf('/') + 1)
      let real = { desformCode: code, desformName: item.title }
      uni.navigateTo({
        url: '/pages/check/onlineForm/add?item=' + encodeURIComponent(JSON.stringify(real)),
      })
    } else if (page.indexOf('/app/desform') == 0) {
      let code = page.substring(page.lastIndexOf('/') + 1)
      let real = { desformCode: code, desformName: item.title }
      uni.navigateTo({
        url: '/pages/check/designForm/designForm?item=' + encodeURIComponent(JSON.stringify(real)),
      })
    } else {
      // if (!hasRoute(page)) {
      //   this.$tip.alert('路由地址不存在')
      // } else {
      //   this.$Router.replace({ name: page, params: { backRouteName: 'index' } })
      // }
      router.replace({ name: page, params: { backRouteName: 'index' } })
    }
  }
}
onLoad((params) => {
  console.log('more页面：onLoad', params)
  type = params.type
  init()
})
</script>

<style lang="scss" scoped>
//
:deep(.wd-img) {
  margin-right: 16upx;
}
:deep(.wd-cell) {
  line-height: 30px;
}
</style>
