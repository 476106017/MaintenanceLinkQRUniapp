/**
 * 常用服务
 * useful server
 */

const icon_prefix = '/static/index/128/'

/*
 */
export const us = {
  data: [
    {
      title: 'QR', //标题
      icon: icon_prefix + 'qingjia1.png', //图标
      description: '设备二维码管理', //描述
      routeIndex: 'BizDeviceList', //路由名称
    },
    {
      title: 'online',
      icon: icon_prefix + 'qingjia1.png',
      description: 'online',
      useCount: 10000,
      routeIndex: 'online',
      enabled: true,
    },
    {
      title: '仪表盘',
      icon: icon_prefix + 'chart.png',
      description: '仪表盘',
      useCount: 10000,
      routeIndex: 'workHome',
      enabled: true,
    },
    {
      title: '组件示例',
      icon: icon_prefix + 'chuchai.png',
      description: '组件示例',
      useCount: 10000,
      routeIndex: 'demo',
      enabled: true,
    },
    {
      title: '流程待办',
      icon: icon_prefix + 'gongwen.png',
      description: '流程待办',
      useCount: 10000,
      routeIndex: 'flowIndex',
    },
    {
      title: '知识库',
      icon: icon_prefix + 'qingjia1.png',
      description: '知识库',
      useCount: 10000,
      routeIndex: 'knowledge',
      enabled: true,
    },
    {
      title: '通知公告',
      icon: icon_prefix + 'tongzhi.png',
      description: '查看企业对员工下发的通知公告',
      useCount: 10000,
      routeIndex: 'annotationList',
      enabled: true,
    },
    {
      title: '请假申请',
      icon: icon_prefix + 'richang.png',
      description: '请假申请',
      useCount: 10000,
      routeIndex: 'leave',
      enabled: true,
    },
    {
      title: '出差申请',
      icon: icon_prefix + 'zhoubao.png',
      description: '出差申请',
      useCount: 10000,
      routeIndex: 'businesStrip',
      enabled: true,
    },
    {
      title: '公文发文',
      icon: icon_prefix + 'zhoubao.png',
      description: '公文发文',
      useCount: 10000,
      routeIndex: 'docSend',
      enabled: true,
    },
    {
      title: '日程',
      icon: icon_prefix + 'richeng.png',
      description: '建立和查看个人工作安排',
      useCount: 10000,
      routeIndex: 'schedule',
    },
    {
      title: '考勤',
      icon: icon_prefix + 'kaoqin.png',
      description: '工作考勤',
      routeIndex: 'ClockIn',
      useCount: 10000,
      enabled: true,
    },
    {
      title: '内部邮件',
      icon: icon_prefix + 'youjian.png',
      description: '查看内部消息',
      useCount: 10000,
      dot: false,
      routeIndex: 'mailHome',
      enabled: true,
    },
  ],
}

/**
 * other server 其他服务
 */
export const os = {
  data: [
    {
      title: '新闻中心',
      icon: icon_prefix + 'xinwen.png',
      description: '新闻中心',
      routeIndex: 'news',
      useCount: 10000,
    },
    {
      title: '会议',
      icon: icon_prefix + 'huiyi.png',
      description: '会议',
      useCount: 10000,
      routeIndex: 'meeting',
      enabled: true,
    },
    {
      title: '任务中心',
      icon: icon_prefix + 'renwu.png',
      description: '任务中心',
      useCount: 10000,
    },
    {
      title: '合同',
      icon: icon_prefix + 'hetong.png',
      description: '合同',
      useCount: 10000,
    },
  ],
}
