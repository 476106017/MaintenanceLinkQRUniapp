export const ACCESS_TOKEN = 'Access-Token'
export const USER_NAME = 'login_username'
export const USER_INFO = 'login_user_info'
export const NAV_BAR_COLOR = 'bg-gradual-blue'
export const APP_ROUTE = 'app_route_list'
export const APP_CONFIG = 'app_config'
export const X_TENANT_ID = 'X-Tenant-Id'
export const X_Low_App_ID = 'X-Low-App-ID'
export const TENANT_LIST = 'tenant_list'
export const ROUTE_PARAMS = "cacheRouteParams"
export const HOME_PAGE = "/pages/qr/BizDeviceList"
/**
 * 组件名称前缀
 */
export const COMP_NAME_PREFIX = 'jeecg-drag';
//首页配置项缓存时间10分钟
export const HOME_CONFIG_EXPIRED_TIME = 10*60
export const phone = '---'
export const email = '---'
export const company = '---'


const STORAGE_OPTIONS = {
  namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
}

export default STORAGE_OPTIONS;
//类型条件
export const conditionObj = {
 	input:[{label:"包含",value:"like"},{label:"以...开始",value:"right_like"},{label:"以...结尾",value:"left_like"},{label:"在...中",value:"in"}],
	number:[{label:"大于",value:"gt"},{label:"大于等于",value:"ge"},{label:"小于",value:"lt"},{label:"小于等于",value:"le"}],
	date:[{label:"大于",value:"gt"},{label:"大于等于",value:"ge"},{label:"小于",value:"lt"},{label:"小于等于",value:"le"}],
	select:[],
	checkbox:[{label:"多词匹配",value:"elemMatch"}],
}
/**
 * 颜色板
 * classic：经典
 * technology：科技
 * business：商务
 * botany：植物
 * natural：自然
 * colour：彩色
 */
export const colorPanel = {
  classic:["#64b5f6","#4db6ac","#ffb74d","#e57373","#9575cd","#a1887f","#90a4ae","#4dd0e1","#81c784","#ff8a65"],
  technology:["#3a5b84","#4d6e98","#7594b9","#bfd7f2","#18619f","#408aca","#5ea8e9","#81c3fc","#71a5cb","#a1cae4"],
  business:["#ccedf7","#b9dcf0","#12a0e7","#0663a4","#458890","#97d9cd","#4bb8bf","#20899c","#f44336  ","#a2c7d9"],
  botany:["#34b392","#4ac2a6","#8ed1c0","#ccdec6","#61bdb5","#7993a1","#93a889","#5e8d83","#115040","#bcc5b4"],
  natural:["#85cacd","#a7d676","#fee159","#fbc78e","#ef918b","#a9b5ff","#e7daca","#fc803a","#fea1ac","#c2a3cd"],
  colour:["#fddb9c","#f9ae91","#f59193","#d47f97","#bd86a6","#f595a1","#624772","#fe7156","#ffbda3","#877fa8"]
};
//所有条件
export const allCondition = [
  {label:"包含",value:"like"},
	{label:"以...开始",value:"right_like"},
	{label:"以...结尾",value:"left_like"},
	{label:"在...中",value:"in"},
	{label:"大于",value:"gt"},
	{label:"大于等于",value:"ge"},
	{label:"小于",value:"lt"},
	{label:"小于等于",value:"le"},
	{label:"多词匹配",value:"elemMatch"},
	{label:"等于",value:"eq"},
	{label:"不等于",value:"ne"},
	{label:"为空",value:"empty"},
	{label:"不为空",value:"not_empty"}
]
//仪表盘组件
export const compList = [
 	"JBar",
 	"JStackBar",
 	"JMultipleBar",
 	"JNegativeBar",
 	"JProgress",

 	"JLine",
 	"JMultipleLine",
 	"DoubleLineBar",

 	"JPie",
 	"JRing",

 	"JFunnel",
 	"JPyramidFunnel",

 	"JRadar",
 	"JCircleRadar",

 	"JGauge",
 	"JColorGauge",

 	"JScatter",
 	"JBubble",

	"JDragEditor",
	"JCarousel",
	"JIframe",
	"JNumber",
	"JCustomButton",
	"JPivotTable",

	"JBubbleMap",
	"JBarMap",
	"JHeatMap",
 ];
 //不包含操作的组件
export const noActionList = [
  "JCustomButton",
	"JIframe",
	"JCarousel",
	"JDragEditor",
];

//系统字段
export const systemFields = [{
	dataIndex:"create_time",
	key:"create_time",
	title:"创建时间",
	type:'date',
	width:200
},{
	dataIndex:"create_by",
	key:"create_by",
	title:"创建人",
	width:150
},{
	dataIndex:"update_time",
	key:"update_time",
	title:"修改时间",
	type:'date',
	width:200
},{
	dataIndex:"update_by",
	key:"update_by",
	title:"修改人",
	width:150
}]
