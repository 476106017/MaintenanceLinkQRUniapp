<template>
  <view class="zai-box">
    <!-- 登录加载弹窗 -->
    <view class="cu-load load-modal">
      <image
        src="https://static.jeecg.com/files/app_logo.png"
        mode="aspectFit"
        class="round"
      ></image>
      <view class="gray-text">正在登录中...</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from '@/plugin/uni-mini-router'
import { useToast } from 'wot-design-uni'
import { ACCESS_TOKEN, APP_ROUTE, APP_CONFIG, HOME_PAGE, HOME_CONFIG_EXPIRED_TIME} from '@/common/constants'
import { useUserStore } from '@/store/user'
import { useParamsStore } from '@/store/page-params'
import {isOAuth2AppEnv, getUrlParams, cache} from '@/common/uitls'
import { getEnvBaseUrl } from '@/utils'
import { http } from '@/utils/http'
//import { requestAuthCode } from "dingtalk-jsapi";

const router = useRouter()
const toast = useToast()
const userStore = useUserStore()
const paramsStore = useParamsStore()
const loading = ref(false)
const isLocalConfig = true
//操作环境
const env = ref({
  thirdType:'',
  thirdApp: false,
  wxWork: false,
  dingtalk: false,
})
//跳转地址
const redirectUrl = ref('')
//租户ID
const tenantId = ref(null)

onMounted(() => {
  // 如果当前 不是 OAuth2APP环境，就重定向到 /user/login 页面
  if (!isOAuth2AppEnv()) {
    router.replace({ name: 'login' })
  }
  checkEnv()
  doOAuth2Login()
})

// 检测当前的环境
const checkEnv = () => {
  // 判断当时是否是企业微信环境
  if (/wxwork/i.test(navigator.userAgent)) {
    env.value.thirdApp = true
    env.value.wxWork = true
  }
  // 判断当时是否是钉钉环境
  if (/dingtalk/i.test(navigator.userAgent)) {
    env.value.thirdApp = true
    env.value.dingtalk = true
  }
}

// 进行OAuth2登录操作
const doOAuth2Login = () => {
  if (env.value.thirdApp) {
    // 判断是否携带了Token，是就说明登录成功
    redirectUrl.value = '';
    let search = window.location.search;
    let href = window.location.href;
    // 获取租户id
    getTenantId(window.location.href);
    //http://192.168.1.66:9000/oauth2-app/login?
    // oauth2LoginToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDI3NTE3MTMsInVzZXJuYW1lIjoiMTU5MzE5OTMyOTQifQ.ZlF3DtBUkBLIfRZZUhbYsXo6wNRcD6jVLyHHwLRVa-Q
    // &tenantId=1
    // &thirdType=dingtalk
    //包含token的地址，就直接跳转路由
    if (search.indexOf('hasToken') > 0 || href.indexOf('hasToken') > 0) {
      let obj:any = search ? getUrlParams(search) : getUrlParams(href)
      if (obj.params.redirect) {
        redirectUrl.value = decodeURIComponent(decodeURIComponent(obj.params.redirect))
        goRedirectUrl()
      } else {
        toast.warning('hasToken参数错误!')
      }
    } else if (search.indexOf('oauth2LoginToken') > 0) {
      //包含oauth2LoginToken的地址就去走auth登录
      let obj: any = getUrlParams(search)
      env.value.thirdType = obj.params.thirdType;
      let token = obj.params.oauth2LoginToken;
      if (obj.params.redirect) {
        redirectUrl.value = decodeURIComponent(obj.params.redirect)
      }
      //第三方登录
      doThirdLogin(token)
    } else if (env.value.wxWork) {
      //企业微信oauth登录
      doWechatEnterpriseOAuth2Login()
    } else if (env.value.dingtalk) {
      //钉钉oauth登录
      doDingTalkOAuth2Login()
    }
  }
}

// 根据token执行登录
const doThirdLogin = (token) => {
  http
    .get(`/sys/thirdLogin/getLoginUser/${token}/${env.value.thirdType}/${tenantId.value}`)
    .then((res:any) => {
      if (res.success) {
        const { result } = res;
        const userInfo = result.userInfo;
        userStore.setUserInfo({
          token: result.token,
          userid: userInfo.id,
          username: userInfo.username,
          realname: userInfo.realname,
          avatar: userInfo.avatar,
          tenantId: userInfo.loginTenantId,
          localStorageTime: +new Date(),
        })
        loginSuccess()
      } else {
        requestFailed(res)
      }
    })
    .catch((e) => {
      toast.warning(e.message || e)
    })
}
/**
 * 登录成功
 */
const loginSuccess = () => {
  // 非低代码平台的,获取app配置,跳转
  appConfig()
}
/**
 * 登录失败
 */
const requestFailed = (err) => {
  toast.warning('登录失败')
}
/**
 * 获取租户ID
 * @param url
 */
const getTenantId = (url) => {
  let obj = getUrlParams(url)
  if (obj.params && obj.params['tenantId']) {
    tenantId.value = obj.params['tenantId']
  }
}
/**
 * 跳转回调地址
 */
const goRedirectUrl = () => {
  let obj:any = getUrlParams(redirectUrl.value)
  let path = obj.url
  let params = obj.params
  if (params.info) {
    let temp = JSON.parse(params.info)
    let query = {
      instanceId: temp.procInsId,
      taskId: temp.taskId,
      taskDefKey: temp.taskDefKey,
    }
    if (temp.claim == 1) {
      query['claim'] = 1
    }
    router.replaceAll({ path, query })
  } else if (params.taskId) {
    let query = {
      instanceId: params.procInsId,
      taskId: params.taskId,
      taskDefKey: params.taskDefKey,
    }
    if (params.claim == 1) {
      query['claim'] = 1
    }
    router.replaceAll({ path, query })
  } else {
    router.replaceAll({ path })
  }
}

const appConfig = () => {
  if(isLocalConfig){
    toast.success('登录成功!')
    router.pushTab({ path: HOME_PAGE })
  }else{
    http.get('/eoa/sysAppConfig/queryAppConfigRoute').then((res: any) => {
      if (res.success) {
        cache(APP_ROUTE, res.result.route, HOME_CONFIG_EXPIRED_TIME)
        cache(APP_CONFIG, res.result.config, HOME_CONFIG_EXPIRED_TIME)
        toast.success('登录成功!')
        if (redirectUrl.value) {
          goRedirectUrl()
        } else {
          router.pushTab({ path: HOME_PAGE })
        }
      }
    })
  }
}

// 企业微信OAuth2登录
const doWechatEnterpriseOAuth2Login = () => {
  sysOAuth2Login('wechat_enterprise')
}

// 钉钉OAuth2登录
const doDingTalkOAuth2Login = () => {
  //新版钉钉登录-引用js，app打包有问题，先注释掉
  //dingdingLogin();
  //旧版钉钉登录
  toOldAuthLogin();
}

// 后台构造oauth2登录地址
const sysOAuth2Login = (source) => {
  let domainURL = getEnvBaseUrl()
  let url = `${domainURL}/sys/thirdLogin/oauth2/${source}/login`
  url += `?state=${encodeURIComponent(window.location.origin)}`
  if (tenantId.value) {
    url += `&tenantId=${tenantId.value}`
  }
  window.location.href = url;
}
/**
 * 旧版钉钉登录
 */
function toOldAuthLogin() {
  let token = userStore.userInfo.token
  if (token) {
    router.pushTab({ path: HOME_PAGE })
  } else {
    sysOAuth2Login('dingtalk')
  }
}
/**
 * 钉钉登录
 */
function dingdingLogin () {
  //先获取钉钉的企业id，如果没有配置 还是走原来的逻辑，走原来的逻辑 需要判断存不存在token，存在token直接去首页
  let currentTenantId = tenantId.value || 0;
  let url = `/sys/thirdLogin/get/corpId/clientId?tenantId=${currentTenantId}`;
  http.get(url).then((res:any) => {
    let s = JSON.stringify(res);
    if (res.success) {
      if(res.result && res.result.corpId && res.result.clientId){
        // requestAuthCode({ corpId: res.result.corpId, clientId: res.result.clientId }).then((res) => {
        //   let { code } = res;
        //   sysOAuth2Callback(code);
        // });
      }else{
        toOldAuthLogin();
      }
    } else {
      toOldAuthLogin();
    }
  }).catch((err) => {
    toOldAuthLogin();
  });
}

/**
 * 后台callBack
 * @param code
 */
function sysOAuth2Callback(code:string) {
  let domainURL = getEnvBaseUrl()
  let url = `${domainURL}/sys/thirdLogin/oauth2/dingding/login`;
  url += `?state=${encodeURIComponent(window.location.origin)}&authCode=${code}`;
  if(tenantId.value){
    url += `&tenantId=${tenantId.value}`;
  }
  window.location.href = url;
}
</script>

<style scoped>
.login-paddingtop {
  padding-top: 100upx;
}

.zai-box {
  padding: 0 20upx;
  padding-top: 100upx;
  position: relative;
}

.zai-logo {
  width: 200upx;
  height: 150px;
}

.zai-title {
  font-size: 58upx;
  color: #000000;
  text-align: center;
}

.input-placeholder,
.zai-input {
  color: #94afce;
}

.zai-label {
  padding: 60upx 0;
  text-align: center;
  font-size: 30upx;
  color: #a7b6d0;
}

.zai-btn {
  background: #ff65a3;
  color: #fff;
  border: 0;
  border-radius: 100upx;
  font-size: 36upx;
}

.zai-btn:after {
  border: 0;
}

/*按钮点击效果*/
.zai-btn.button-hover {
  transform: translate(1upx, 1upx);
}
</style>
