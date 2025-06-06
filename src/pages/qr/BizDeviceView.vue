<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '设备信息查看',
  },
}
</route>

<template>
  <PageLayout :navTitle="navTitle" :backRouteName="backRouteName">
    <template #navRight>
      <view class="u-iconfont u-icon-person color-white" @click="goLogin"></view>
    </template>
    <scroll-view class="scrollArea" scroll-y>
      <view class="form-container">
        <wd-cell-group border>
          <wd-cell :title="get4Label('设备编号')" :value="myFormData.no" />
          <wd-cell :title="get4Label('设备名')" :value="myFormData.name" />
          <wd-cell :title="get4Label('生产批次')" :value="myFormData.productionBatch" />
          <wd-cell :title="get4Label('生产日期')" :value="myFormData.productionDate" />
          <wd-cell :title="get4Label('生产人员')" :value="myFormData.productionPerson" />
          <wd-cell :title="get4Label('出货状态')" :value="myFormData.status_dictText" />
          <wd-cell :title="get4Label('出货日期')" :value="myFormData.shippedDate" />
          <wd-cell :title="get4Label('出货去向')" :value="myFormData.shippedTo" />
        </wd-cell-group>
        <view class="image-area" v-if="myFormData.picture">
          <image :src="myFormData.picture" mode="widthFix" style="width: 100%" />
        </view>
        <view class="file-area" v-if="myFormData.drawingPdfUrl">
          <wd-cell title="生产图纸">
            <view class="link" @click="openFile(myFormData.drawingPdfUrl)">{{ myFormData.drawingPdfUrl }}</view>
          </wd-cell>
        </view>
      </view>
    </scroll-view>
  </PageLayout>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useToast } from 'wot-design-uni'
import { useRouter } from '@/plugin/uni-mini-router'
import { ref, reactive, computed } from 'vue'

defineOptions({
  name: 'BizDeviceView',
  options: {
    styleIsolation: 'shared',
  },
})

const toast = useToast()
const router = useRouter()
const myFormData = reactive({})
const navTitle = ref('详情')
const dataId = ref('')
const backRouteName = ref('BizDeviceList')

const get4Label = computed(() => {
  return (label) => {
    return label && label.length > 4 ? label.substring(0, 4) : label
  }
})

const initData = () => {
  http.get('/qr/bizDevice/queryById', { id: dataId.value }).then((res) => {
    if (res.success) {
      Object.assign(myFormData, { ...res.result })
    } else {
      toast.error(res?.message || '表单加载失败！')
    }
  })
}

const initForm = (option) => {
  if (option?.dataId) {
    dataId.value = option.dataId
    initData()
  }
}

const goLogin = () => {
  router.push({ path: '/pages/login/login' })
}

const openFile = (url: string) => {
  if (!url) return
  uni.navigateTo({ url })
}

onLoad((option) => {
  initForm(option)
})
</script>

<style lang="scss" scoped>
</style>
