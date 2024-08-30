import builderOptions, { setOptions } from './IBuilderOptions';

const transformCustomerDataOpt = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        Id: item.reservationId,
        customerId: item.customerId,
        customerName: item.customerName,
        customerPhone: item.customerPhone,
        tableId: item.tableId,
        numberOfPeople: item.numberOfPeople,
        reservationDate: item.reservationDate,
        reservationTime: item.reservationTime,
      }));
    } else {
      return {
        Id: data.reservationId,
        customerId: data.customerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        tableId: data.tableId,
        numberOfPeople: data.numberOfPeople,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
      };
    }
  };
const urlOpt = process.env.REACT_APP_API_PATH + process.env.REACT_APP_COMPONENT_RESERVATION;
const componentOpt = process.env.REACT_APP_COMPONENT_DETAIL;
const ModalOpt = {
    title: 'Xác nhận xóa',
    mes: 'Bạn có chắc chắn muốn xóa bản ghi Đặt Bàn:',
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
    { label: 'ID Khách Hàng', type: 'number', placeholder: '', feedBack: 'Nhập giá trị hợp lệ', key: 'customerId' },
    { label: 'ID Bàn', type: 'number', placeholder: '', feedBack: 'Nhập giá trị hợp lệ', key: 'tableId' },
    { label: 'Số Người', type: 'number', placeholder: '', feedBack: 'Nhập giá trị hợp lệ', key: 'numberOfPeople' },
    { label: 'Ngày/Giờ', type: 'text', placeholder: 'yy-mm-ddThours:minute:second', feedBack: 'Nhập giá trị hợp lệ', key: 'reservationDate' },
    { label: 'Thời Gian', type: 'text', placeholder: 'hours:minute:second', feedBack: 'Nhập giá trị hợp lệ', key: 'reservationTime' }
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

