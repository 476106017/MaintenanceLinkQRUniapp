import { render } from '@/common/renderUtils';
//列表数据
export const columns = [
    {
    title: '设备编号（唯一）',
    align:"center",
    dataIndex: 'deviceNo'
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
    title: '生产人员姓名',
    align:"center",
    dataIndex: 'productionPerson'
   },
   {
    title: '维保联系电话',
    align:"center",
    dataIndex: 'maintenanceTel'
   },
   {
    title: '生产图纸 PDF 存储路径',
    align:"center",
    dataIndex: 'drawingPdfUrl'
   },
   {
    title: '二维码图片 URL',
    align:"center",
    dataIndex: 'qrCodeUrl'
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
];