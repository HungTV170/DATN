import builderOptions, { setOptions } from './IBuilderOptions';

const transformCustomerDataOpt = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        Id: item.orderId,
        orderDate: item.orderDate,
        status: item.status,
        customer: item.customer,
        table: item.table,

        employee: item.employee,
        orderItems: item.orderItems,
        payment: item.payment,
        sdt:item.sdt
      }));
    } else {
      return {
        Id: data.orderId,
        orderDate: data.orderDate,
        status: data.status,
        customer: data.customer,
        table: data.table,
        employee: data.employee,
        orderItems: data.orderItems,
        payment: data.payment,
        sdt: data.sdt,
        customerId: data.customerId,

        // tableId:data.tableId,
        employeeId:data.employeeId,
        statusId:data.statusId
      };
    }
  };
const urlOpt = process.env.REACT_APP_API_PATH + process.env.REACT_APP_COMPONENT_ORDER;
const componentOpt = process.env.REACT_APP_COMPONENT_DETAIL;
const ModalOpt = {
    title: 'Xác nhận xóa',
    mes: 'Bạn có chắc chắn muốn xóa Đơn Hàng:',
    show: false,
    handleClose: () => {},
    confirmButton: true,
    onConfirm: null
  };
const DataTableOpt = {
    searchable: true,
    fixedHeight: true,
    perPageSelect: [5, 10, 15, 20],
    perPage: 5,
    labels: {
      placeholder: "Tìm kiếm...",
      perPage: "kết quả / Trang",
      noRows: "không tìm thấy kết quả phù hợp",
      info: "Hiển thị kết quả thứ {start} tới thứ {end} trên tổng số {rows} kết quả",
    },
  };
const formOpt = [
    { label: 'customerId', type: 'number', placeholder: 'Id', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'customerId' },
    { label: 'employeeId', type: 'number', placeholder: 'Id', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'employeeId' ,isDisabled: true},
    { label: 'statusId', type: 'number', placeholder: '0 -> 4', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'statusId' }
  ];

setOptions({
    transformCustomerData: transformCustomerDataOpt,
    url: urlOpt,
    component: componentOpt,
    ModalOpt: ModalOpt,
    DataTableOpt: DataTableOpt,
    formOpt: formOpt
  });

  const Options = {...builderOptions} ;

  export default Options

