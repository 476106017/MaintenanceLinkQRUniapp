import { render } from '@/common/renderUtils';
//列表数据
export const columns = [
    {
    title: '设备编号',
    align:"center",
    dataIndex: 'no'
   },
   {
    title: '设备名',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '生产批次',
    align:"center",
    dataIndex: 'productionBatch'
   },
   {
    title: '生产日期',
    align:"center",
    dataIndex: 'productionDate'
   },
   {
    title: '生产人员',
    align:"center",
    dataIndex: 'productionPerson'
   },
   {
    title: '设备照片',
    align:"center",
    dataIndex: 'picture',
    customRender:render.renderImage,
   },
   {
    title: '生产图纸',
    align:"center",
    dataIndex: 'drawingPdfUrl',
   },
   {
    title: '出货状态',
    align:"center",
    dataIndex: 'status_dictText'
   },
   {
    title: '出货日期',
    align:"center",
    dataIndex: 'shippedDate'
   },
   {
    title: '出货去向',
    align:"center",
    dataIndex: 'shippedTo'
   },
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createTime',
   },
   {
    title: '更新时间',
    align:"center",
    dataIndex: 'updateTime',
   },
];