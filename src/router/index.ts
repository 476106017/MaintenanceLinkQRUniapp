import { createRouter } from '@/plugin/uni-mini-router'
// 导入pages.json
import pagesJson from '../pages.json'
console.log("pagesJson::",pagesJson);
// 引入uni-parse-pages
import pagesJsonToRoutes from 'uni-parse-pages'
import { useUserStore } from '@/store/user'
import {
  HOME_PAGE,
  ROUTE_PARAMS
} from '@/common/constants'
import { cache,isOAuth2AppEnv } from '@/common/uitls'
import {isEmpty} from "@/utils/is";
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson)
setRouteName(routes)
const router = createRouter({
  routes: [...routes], // 路由表信息
})
export const whiteList = ['/pages/login/login','/pages/login/loginOauth2','/pages/qr/BizDeviceView','/pages/about/about']
export const loginPage = '/pages/login/login'
interface CacheRoute {
  path: string;
  query: Record<string, string | number | boolean>;
}
export const beforEach = (to, from, next) => {
  const userStore = useUserStore()
  //update-begin-author:liusq---date:2025-03-20--for: 防止移动端oauth地址和PC不一致的问题
  if(to.path == '/oauth2-app/login'){
    let temp = location.href;
    location.href = temp.replace('/oauth2-app/login','/pages/login/loginOauth2')
    return;
  }
  //update-end-author:liusq---date:2025-03-20--for:防止移动端oauth地址和PC不一致的问题
  if (userStore.isLogined) {
    // 有登录态
    if(to.path === '/pages/login/loginOauth2'){
      //有跳转地址
      if(to.query && to.query.redirect){
        next()
      }else{
        //跳转到首页
        next({path: HOME_PAGE})
      }
    }
    //update-begin-author:liusq---date:2025-03-20--for: 流程路由逻辑
    let flowRoute = getPathAndQuery(to);
    if(flowRoute===false){
      let cacheRoute = cache(ROUTE_PARAMS);
      if(cacheRoute && !isEmpty(cacheRoute) && (cacheRoute as any)?.path == to.path
          && isEmpty(to.query)
          && !isEmpty((cacheRoute as any)?.query)){

        to.query = (cacheRoute as any)?.query;
        next({ path: to.path, query: (cacheRoute as any)?.query })
      }else{
        cache(ROUTE_PARAMS,to,1*60*10);
        next()
      }
    }else{
      next({ path: flowRoute.path, query: flowRoute.query })
    }
    //update-end-author:liusq---date:2025-03-20--for: 流程路由逻辑
  } else {
    // 无登录态
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，如果进入的页面是login页面并且当前是OAuth2app环境，就进入OAuth2登录页面
      if (to.path === '/pages/login/login' && isOAuth2AppEnv()) {
        next({path: '/pages/login/loginOauth2'})
      } else {
        // 在免登录白名单，直接进入
        next()
      }
    } else {
      // 如果当前是在OAuth2APP环境，就跳转到OAuth2登录页面
      let path = isOAuth2AppEnv() ? '/pages/login/loginOauth2' : '/pages/login/login';
      let temp = to.path;
      if(isOAuth2AppEnv() && temp=='/pages/flow/myTaskDetail'){
        if(to.query && to.query.info){
          temp+='?info='+to.query.info
        }
        next({ path: path, query: { redirect: encodeURIComponent(temp) } })
      }else{
        next({ path: path })
      }
    }
  }
}
// 全局前置守卫
router.beforeEach(beforEach)

// 路由的最后一级为路由名字不可重复
function setRouteName(routes) {
  routes.forEach((item) => {
    if (item.path) {
      const name = item.path.split('/').pop()
      item.name = name
    }
  })
}

/**
 * 路由跳转-已经登录过了 直接next会导致参数丢失，所以需要再走一遍loginOauth2页面的逻辑
 * @param to
 * @returns {{path: string, query: {redirect: string}}|boolean}
 */
function getPathAndQuery(to){
  if(to.path === '/pages/flow/myTaskDetail'){
    if(to.query && to.query.info){
      let info = JSON.parse(to.query.info)
      info['hasToken'] = 1;
      let temp = '/pages/flow/myTaskDetail?info='+ JSON.stringify(info)
      return {
        path: '/pages/login/loginOauth2',
        query: { redirect: encodeURI(temp) }
      }
    }
  }
  return false
}
export default router
