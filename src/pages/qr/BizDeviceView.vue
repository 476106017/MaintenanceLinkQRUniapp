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
  <PageLayout
    :navTitle="navTitle"
    :backRouteName="backRouteName"
    navLeftText=""
    :navLeftArrow="false"
    :navLeftDisabled="true"
  >
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
        <view class="image-area" v-if="pictureList.length">
          <wd-cell :title="get4Label('设备照片')">
            <view class="img-list">
              <wd-img
                v-for="(pic, idx) in pictureList"
                :key="idx"
                :width="80"
                :height="80"
                :src="getFileAccessHttpUrl(pic)"
                @click="previewImg(idx)"
              ></wd-img>
            </view>
          </wd-cell>
          <ImgPreview
            ref="imgPreviewRef"
            v-if="imgPreview.show"
            :urls="imgPreview.urls"
            @close="() => (imgPreview.show = false)"
          ></ImgPreview>
        </view>
        <view class="file-area" v-if="fileList.length">
          <wd-cell title="生产图纸">
            <view class="file-list">
              <view
                v-for="(file, idx) in fileList"
                :key="idx"
                class="link"
                @click="openFile(getFileAccessHttpUrl(file))"
                >{{ formatFileName(file) }}</view
              >
            </view>
          </wd-cell>
        </view>
      </view>
    </scroll-view>
    <view class="footer">
      <view>北京国炬是一家专注于设备维保与管理的高新技术企业，致力于为客户提供优质的产品及服务。</view>
      <view>维保电话：400-100-1000</view>
    </view>
  </PageLayout>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useToast } from 'wot-design-uni'
import { useRouter } from '@/plugin/uni-mini-router'
import { ref, reactive, computed, nextTick } from 'vue'
import { getFileAccessHttpUrl, downloadFile } from '@/common/uitls'

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
const pictureList = ref<string[]>([])
const fileList = ref<string[]>([])
const imgPreview = ref({
  show: false,
  urls: [] as string[],
})
const imgPreviewRef = ref()

const get4Label = computed(() => {
  return (label) => {
    return label && label.length > 4 ? label.substring(0, 4) : label
  }
})

const initData = () => {
  http.get('/qr/bizDevice/queryById', { id: dataId.value }).then((res) => {
    if (res.success) {
      Object.assign(myFormData, { ...res.result })
      pictureList.value = (res.result.picture || '').split(',').filter((i) => i)
      fileList.value = (res.result.drawingPdfUrl || '').split(',').filter((i) => i)
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
  downloadFile(url)
}

const formatFileName = (path: string) => {
  if (!path) return ''
  const name = path.split('/').pop() || path
  if (name.length > 20) {
    const extIndex = name.lastIndexOf('.')
    const ext = extIndex !== -1 ? name.slice(extIndex) : ''
    return name.slice(0, 15) + '...' + ext
  }
  return name
}

const previewImg = (index: number) => {
  if (!pictureList.value.length) return
  imgPreview.value.urls = pictureList.value.map((item) => getFileAccessHttpUrl(item))
  imgPreview.value.show = true
  nextTick(() => {
    const cur = imgPreview.value.urls[index]
    imgPreviewRef.value && imgPreviewRef.value.open(cur)
  })
}

onLoad((option) => {
  initForm(option)
})
</script>

<style lang="scss" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.file-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer {
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 10px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 10px);
}
</style>
