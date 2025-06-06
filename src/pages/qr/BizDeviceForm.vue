<route lang="json5" type="page">
{
layout: 'default',
style: {
navigationStyle: 'custom',
navigationBarTitleText: '设备二维码管理',
},
}
</route>

<template>
  <PageLayout :navTitle="navTitle" :backRouteName="backRouteName">
    <scroll-view class="scrollArea" scroll-y>
      <view class="form-container">
        <wd-form ref="form" :model="myFormData">
          <wd-cell-group border>
          <view class="{ 'mt-14px': 0 == 0 }">
              <wd-input
                  label-width="100px"
                  v-model="myFormData['no']"
                  :label="get4Label('设备编号')"
                  name='no'
                  prop='no'
                  placeholder="请选择设备编号"
                  :rules="[
                                  { required: true, message: '请输入设备编号!'},
                  ]"
                  clearable
              />
        </view>
          <view class="{ 'mt-14px': 1 == 0 }">
              <wd-input
                  label-width="100px"
                  v-model="myFormData['name']"
                  :label="get4Label('设备名')"
                  name='name'
                  prop='name'
                  placeholder="请选择设备名"
                  :rules="[
                  ]"
                  clearable
              />
        </view>
          <view class="{ 'mt-14px': 0 == 0 }">
              <wd-input
                  label-width="100px"
                  v-model="myFormData['productionBatch']"
                  :label="get4Label('生产批次')"
                  name='productionBatch'
                  prop='productionBatch'
                  placeholder="请选择生产批次"
                  :rules="[
                  ]"
                  clearable
              />
        </view>
          <view class="{ 'mt-14px': 1 == 0 }">
              <DateTime
                  :label="get4Label('生产日期')"
                  labelWidth="100px"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  name='productionDate'
                  v-model="myFormData['productionDate']"
              ></DateTime>
        </view>
          <view class="{ 'mt-14px': 0 == 0 }">
              <wd-input
                  label-width="100px"
                  v-model="myFormData['productionPerson']"
                  :label="get4Label('生产人员')"
                  name='productionPerson'
                  prop='productionPerson'
                  placeholder="请选择生产人员"
                  :rules="[
                  ]"
                  clearable
              />
        </view>
          <view class="{ 'mt-14px': 1 == 0 }">
               <!-- 图片 -->
            <wd-cell
                :title="get4Label('设备照片')"
                title-width="100px"
             >
              <online-image
                  v-model:value="myFormData['picture']"
                  name='picture'
              />
            </wd-cell>
        </view>
          <view class="{ 'mt-14px': 0 == 0 }">
             <wd-cell
                :title="get4Label('生产图纸')"
                title-width="100px"
             >
           <!-- #ifndef APP-PLUS -->
           <online-file
            v-model:value="myFormData['drawingPdfUrl']"
            name='drawingPdfUrl'
             ></online-file>
           <!-- #endif -->

           <!-- #ifdef APP-PLUS -->
            <online-file-custom
            v-model:value="myFormData['drawingPdfUrl']"
            name='drawingPdfUrl'
            ></online-file-custom>
           <!-- #endif -->
            </wd-cell>
        </view>
          <view class="{ 'mt-14px': 1 == 0 }">
              <online-select
                :label="get4Label('出货状态')"
                 labelWidth="100px"
                 type="list"
                 name='status'
                 dict="qr-status"
                v-model="myFormData['status']"
              ></online-select>
        </view>
          <view class="{ 'mt-14px': 0 == 0 }">
              <DateTime
                  :label="get4Label('出货日期')"
                  labelWidth="100px"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  name='shippedDate'
                  v-model="myFormData['shippedDate']"
              ></DateTime>
        </view>
          <view class="{ 'mt-14px': 1 == 0 }">
              <wd-input
                  label-width="100px"
                  v-model="myFormData['shippedTo']"
                  :label="get4Label('出货去向')"
                  name='shippedTo'
                  prop='shippedTo'
                  placeholder="请选择出货去向"
                  :rules="[
                  ]"
                  clearable
              />
        </view>
          <view class="{ 'mt-14px': 0 == 0 }">
        </view>
          <view class="{ 'mt-14px': 1 == 0 }">
        </view>
          </wd-cell-group>
        </wd-form>
      </view>
    </scroll-view>
    <view class="footer">
      <wd-button :disabled="loading" block :loading="loading" @click="handleSubmit">提交</wd-button>
    </view>
  </PageLayout>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useToast } from 'wot-design-uni'
import { useRouter } from '@/plugin/uni-mini-router'
import { ref, onMounted, computed,reactive } from 'vue'
import OnlineImage from '@/components/online/view/online-image.vue'
import OnlineFile from '@/components/online/view/online-file.vue'
import OnlineFileCustom from '@/components/online/view/online-file-custom.vue'
import OnlineSelect from '@/components/online/view/online-select.vue'
import OnlineTime from '@/components/online/view/online-time.vue'
import OnlineDate from '@/components/online/view/online-date.vue'
import OnlineRadio from '@/components/online/view/online-radio.vue'
import OnlineCheckbox from '@/components/online/view/online-checkbox.vue'
import OnlineMulti from '@/components/online/view/online-multi.vue'
import OnlinePopupLinkRecord from '@/components/online/view/online-popup-link-record.vue'
import SelectDept from '@/components/SelectDept/SelectDept.vue'
import SelectUser from '@/components/SelectUser/SelectUser.vue'
defineOptions({
  name: 'BizDeviceForm',
  options: {
    styleIsolation: 'shared',
  },
})
const toast = useToast()
const router = useRouter()
const form = ref(null)
// 定义响应式数据
const myFormData = reactive({})
const loading = ref(false)
const navTitle = ref('新增')
const dataId = ref('')
const backRouteName = ref('BizDeviceList')
// 定义 initForm 方法
const initForm = (item) => {
  console.log('initForm item', item)
  if(item?.dataId){
    dataId.value = item.dataId;
    navTitle.value = item.dataId?'编辑':'新增';
    initData();
  }
}
// 初始化数据
const initData = () => {
  http.get("/qr/bizDevice/queryById",{id:dataId.value}).then((res) => {
    if (res.success) {
      let obj = res.result
      Object.assign(myFormData, { ...obj })
    }else{
      toast.error(res?.message || '表单加载失败！')
    }
  })
}
const handleSuccess = () => {
  uni.$emit('refreshList');
  router.back()
}
// 提交表单
const handleSubmit = () => {
  let url = dataId.value?'/qr/bizDevice/edit':'/qr/bizDevice/add';
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        loading.value = true;
        http.post(url,myFormData).then((res) => {
          loading.value = false;
          if (res.success) {
            toast.success('保存成功');
            handleSuccess()
          }else{
            toast.error(res?.message || '表单保存失败！')
          }
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
      loading.value = false;
    })
}
// 标题
const get4Label = computed(() => {
  return (label) => {
    return label && label.length > 4 ? label.substring(0, 4) : label;
  }
})

// 标题
const getFormSchema = computed(() => {
  return (dictTable,dictCode,dictText) => {
    return {
      dictCode,
      dictTable,
      dictText
    };
  }
})
/**
 * 获取日期控件的扩展类型
 * @param picker
 * @returns {string}
 */
const getDateExtendType = (picker: string) => {
    let mapField = {
      month: 'year-month',
      year: 'year',
      quarter: 'quarter',
      week: 'week',
      day: 'date',
    }
    return picker && mapField[picker]
      ? mapField[picker]
      : 'date'
}
//设置pop返回值
const setFieldsValue = (data) => {
   Object.assign(myFormData, {...data })
}
// onLoad 生命周期钩子
onLoad((option) => {
  initForm(option)
})
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 10px 20px;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 10px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 10px);
}
</style>
