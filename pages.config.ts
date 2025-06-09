import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'uniapp',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'white',
    backgroundColor: '#000000',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#aaa',
    selectedColor: '#39b54a',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '11px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/tabbar-home-2.png',
        selectedIconPath: 'static/tabbar/tabbar-home.png',
        pagePath: 'pages/index/index',
        text: '功能',
      },
	  // {
	  //   iconPath: 'static/tabbar/tabbar-workHome-2.png',
	  //   selectedIconPath: 'static/tabbar/tabbar-workHome.png',
	  //   pagePath: 'pages-super/flow/flowIndex',
	  //   text: '审批',
	  // },
      {
        iconPath: 'static/tabbar/tabbar-user-2.png',
        selectedIconPath: 'static/tabbar/tabbar-user.png',
        pagePath: 'pages/user/people',
        text: '个人',
      },
    ],
  },
})
