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
          <wd-cell :title="get4Label('制造厂家')" value="武汉鑫宏太电气设备有限公司" />
          <wd-cell :title="get4Label('维保电话')" value="18372207886" />
          <wd-cell :title="get4Label('设备编号')" :value="myFormData.no" />
          <wd-cell :title="get4Label('设备名称')" :value="myFormData.name" />
          <wd-cell :title="get4Label('生产日期')" :value="myFormData.productionDate" />
          <wd-cell :title="get4Label('生产人员')" :value="myFormData.productionPerson" />
          <wd-cell :title="get4Label('出货状态')" :value="statusText" />
          <wd-cell :title="get4Label('出货日期')" :value="myFormData.shippedDate" />
          <wd-cell :title="get4Label('出货去向')" :value="myFormData.shippedTo" />

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
        </wd-cell-group>
      </view>
    </scroll-view>
    <view class="footer">
      <!-- 新增口号 -->
      <view class="slogan-wrapper">
        <view class="slogan">
          服务电力事业，守护用电安全
        </view>
      </view>
      <view class="about-link" @click="openAbout">关于我们</view>
    </view>
  </PageLayout>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useToast } from 'wot-design-uni'
import { useRouter } from '@/plugin/uni-mini-router'
import { ref, reactive, computed, nextTick } from 'vue'
import { getFileAccessHttpUrl, downloadFile, filterMultiDictText } from '@/common/uitls'

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
const statusOptions = ref<any[]>([])
const statusText = ref('')
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

const loadStatusDict = async () => {
  const res: any = await http.get('/sys/dict/getDictItems/qr-status')
  if (res.success) {
    statusOptions.value = res.result
  }
}

const initData = async () => {
  const res: any = await http.get('/qr/bizDevice/queryById', { id: dataId.value })
  if (res.success) {
    Object.assign(myFormData, { ...res.result })
    pictureList.value = (res.result.picture || '').split(',').filter((i) => i)
    fileList.value = (res.result.drawingPdfUrl || '').split(',').filter((i) => i)
    statusText.value = filterMultiDictText(statusOptions.value, myFormData.status) || res.result.status_dictText || ''
  } else {
    toast.error(res?.message || '表单加载失败！')
  }
}

const initForm = async (option) => {
  await loadStatusDict()
  if (option?.dataId) {
    dataId.value = option.dataId
    await initData()
  }
}

const goLogin = () => {
  router.push({ path: '/pages/login/login' })
}

const openAbout = () => {
  router.push({ path: '/pages/about/about' })
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
  justify-content: flex-end; /* 右对齐 */
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
.about-link {
  color: #4e6ef2;
  text-decoration: underline;
  margin-top: 4px;
}
.slogan-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.slogan {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 6px;
  color: #fff;
  padding: 8px 24px;
  background: linear-gradient(90deg, #215eff 10%, #27e3ff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(33,94,255,0.12), 0 2px 8px rgba(39,227,255,0.15);
  text-shadow: 0 2px 12px rgba(33,94,255,0.2), 0 4px 18px rgba(0,0,0,0.12);
  animation: slogan-glow 2.2s ease-in-out infinite alternate;
}

@keyframes slogan-glow {
  0%   { box-shadow: 0 4px 24px rgba(33,94,255,0.10), 0 2px 8px rgba(39,227,255,0.09); }
  100% { box-shadow: 0 4px 40px rgba(33,94,255,0.20), 0 2px 16px rgba(39,227,255,0.22);}
}


</style>
