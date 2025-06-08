<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'demo演示',
    navigationStyle: 'custom',
    disableScroll: true, // 微信禁止页面滚动
    'app-plus': {
      bounce: 'none', // 禁用 iOS 弹性效果
    },
  },
}
</route>

<template>
  <PageLayout backRouteName="index" navTitle="组件示例" routeMethod="pushTab">
    <scroll-view scroll-y>
      <view class="box shadow-warp">
        <div class="content">
          <SelectUser label="用户：" :required="true" v-model="user"></SelectUser>
        </div>
      </view>
      <view class="box shadow-warp">
        <div class="content">
          <SelectDept label="部门：" :required="true" v-model="dept"></SelectDept>
        </div>
      </view>
      <view class="box shadow-warp">
        <div class="content">
          <SelectUserByDepart label="部门2：" :required="true" v-model="dept"></SelectUserByDepart>
        </div>
      </view>
      <view class="box shadow-warp">
        <DateTime
          label="年月日时分秒："
          v-model="dateTime"
          format="YYYY-MM-DD HH:mm:ss"
          startTime="2020-01-01 00:00:00"
          endTime="2030-12-31 23:59:59"
          @change="handleDateTimeChange"
        />
      </view>
      <view class="box shadow-warp">
        <div class="content">
          <!-- <view class="title mb-2">流程进度图组件</view> -->
          <ProgressMap title="流程历史跟踪" :dataSource="proDataSource"></ProgressMap>
        </div>
      </view>
      <view class="box shadow-warp" v-for="(item, index) in dataSource">
        <view class="content">
          <template v-if="index === 0">
            <!-- <view class="title">万年历组件</view> -->
            <uni-calendar
              :showMonth="true"
              @change="change"
              @monthChange="monthChange"
              :selected="selected"
            />
          </template>
          <template v-else>
            <view class="title">{{ item.title }}</view>
            <template v-if="['图片预览'].includes(item.title)">
              <wd-img
                custom-class="imgView"
                :width="220"
                :height="120"
                src="https://jeecgos.oss-cn-beijing.aliyuncs.com/files/site/projectCase/mini/banner/10bdc1.jpg"
                @click="() => (imgPreview.show = true)"
              ></wd-img>
              <ImgPreview
                v-if="imgPreview.show"
                :urls="imgPreview.urls"
                @close="() => (imgPreview.show = false)"
              ></ImgPreview>
            </template>
            <wd-button v-else @click="handleSkip(item.path)">跳转页面</wd-button>
          </template>
        </view>
      </view>
      <view class="box router shadow-warp">
        <wd-button @click="handleSkip('/pages/demo/tree')">树组件</wd-button>
        <wd-button @click="handleSkip('/pages/demo/indexBar')">通讯录</wd-button>
        <wd-button @click="handleSkip('/pages/demo/selectPicker')">单选多选</wd-button>
        <wd-button @click="handleSkip('/pages/demo/form')">表单</wd-button>
      </view>
      <view class="box gridBox shadow-warp">
        <view class="content">
          <!-- <view class="title">九宫格</view> -->
          <Grid
            v-model="gridData"
            :column="3"
            @itemClik="(item) => toast.info(`点击了${item.text}`)"
          ></Grid>
        </view>
      </view>
      <wd-cell-group border clickable custom-class="shadow-warp">
        <wd-cell title="组织管理" is-link icon="computer"></wd-cell>
        <wd-cell title="安全设置" is-link icon="setting"></wd-cell>
        <wd-cell title="个人设置" is-link icon="user"></wd-cell>
        <wd-cell title="退出登录" is-link icon="login"></wd-cell>
      </wd-cell-group>
      <view class="box shadow-warp p-3">
        <view class="content">
          <!-- <view class="title">提示</view> -->
          <view class="flex flex-col">
            <wd-button custom-class="mb-2 btn info" @click="handleToast(0)">常规</wd-button>
            <wd-button custom-class="mb-2 btn warning" @click="handleToast(1)">警告</wd-button>
            <wd-button custom-class="mb-2 btn success" @click="handleToast(2)">成功</wd-button>
            <wd-button custom-class="mb-2 btn error" @click="handleToast(3)">错误</wd-button>
            <wd-button custom-class="mb-2 btn basic" @click="handleToast(4)">
              基本用法(无icon)
            </wd-button>
            <wd-button custom-class="btn" @click="handleConfirm">确认提示</wd-button>
          </view>
        </view>
      </view>
    </scroll-view>
  </PageLayout>
</template>

<script lang="ts" setup>
//
import { ref } from 'vue'
import { useRouter } from '@/plugin/uni-mini-router'
import { useToast, useMessage, useNotify } from 'wot-design-uni'
import { us, os } from '@/common/work'
import Grid from '@/components/Grid/Grid.vue'

const toast = useToast()
const user = ref('')
const dept = ref('')
const message = useMessage()
const { showNotify, closeNotify } = useNotify()
const dateTime = ref()
const router = useRouter()
const selected = ref([])
const gridData = ref([])
const handleDateTimeChange = (value) => {
  console.log(value)
}
us.data.forEach((item: any, index) => {
  if (index < 9) {
    gridData.value.push({ text: item.title, img: item.icon, itemKey: index })
  }
})
// 图片预览
const imgPreview = ref({
  show: false,
  urls: [
    'https://jeecgos.oss-cn-beijing.aliyuncs.com/files/site/projectCase/mini/banner/10bdc1.jpg',
  ],
})
const change = () => {}
const monthChange = () => {}

const proDataSource = [
  {
    activeStep: true,
    data: [
      { label: '流程节点：start' },
      { label: '申请人：神经蛙02' },
      { label: '申请时间：2023-12-06 16:15:14' },
      { label: '已完成' },
    ],
  },
  {
    activeStep: false,
    data: [
      { label: '流程节点：填写' },
      { label: '申请人：神经蛙01' },
      { label: '申请时间：2023-12-06 16:15:14' },
    ],
  },
  {
    activeStep: false,
    data: [
      { label: '流程节点：填写' },
      { label: '申请人：神经蛙03' },
      { label: '申请时间：2023-12-06 16:15:14' },
    ],
  },
]
const dataSource = ref([
  { title: '万年历组件' },
  { title: '图片预览' },
  // {
  //   group: [
  //     { title: '树组件', path: '/pages/demo/tree' },
  //     { title: '通讯录', path: '/pages/demo/indexBar' },
  //     { title: '单选多选', path: '/pages/demo/selectPicker' },
  //     { title: '表单', path: '/pages/demo/form' },
  //   ],
  // },
])
const handleSkip = (path) => {
  router.push({ path: path })
}
const handleToast = (value) => {
  switch (value) {
    case 0:
      // 909cb8
      toast.info({ msg: '常规提示信息' })
      break
    case 1:
      // f0863b
      toast.warning({ msg: '提示信息' })
      break
    case 2:
      // 33d19d
      toast.success({ msg: '操作成功' })
      break
    case 3:
      // f04550
      toast.error({ msg: '手机验证码输入错误，请重新输入' })
      break
    case 4:
      toast.show({ msg: '手机验证码输入错误，请重新输入' })
      break
  }
}
const handleConfirm = (params) => {
  message
    .confirm({
      msg: '提示文案',
      title: '标题',
    })
    .then(() => {
      showNotify({ type: 'success', message: '点击了确认按钮' })
    })
    .catch(() => {
      showNotify({ type: 'warning', message: '点击了取消按钮' })
    })
}
</script>

<style lang="scss" scoped>
//
.mb-2 {
  margin-bottom: 10px;
}

.box {
  background-color: #fff;
  margin: 25px 16px;
  .title {
    padding: 10px;
    padding-bottom: 0;
    font-size: 15;
    color: #666666;
    margin-bottom: 20upx;
  }

  .content {
    :deep(.btn),
    :deep(.imgView) {
      margin: 10px;
    }
    :deep(.wd-button) {
      &.info {
        background-color: #909cb8;
      }
      &.warning {
        background-color: #f0863b;
      }
      &.success {
        background-color: #33d19d;
      }
      &.error {
        background-color: #f04550;
      }
    }
  }
}
.router {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  :deep(.wd-button) {
    margin-bottom: 15px;
    &:nth-child(3),
    &:nth-child(4) {
      margin-bottom: 0;
    }
  }
}
:deep(.wd-cell-group) {
  margin: 0 26upx;
  border-radius: 18upx;
  overflow: hidden;
  --wot-cell-line-height: 32px;
  .wd-icon {
    margin-right: 10px;
  }
  .wd-cell {
    --wot-cell-title-fs: 15px;
    --wot-cell-title-color: var(--color-grey);
    .wd-cell__left {
      font-size: 15px;
      font-weight: 300;
    }
  }
}
</style>
