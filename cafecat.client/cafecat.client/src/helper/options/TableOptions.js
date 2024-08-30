import builderOptions, { setOptions } from './IBuilderOptions';

const transformCustomerDataOpt = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        Id: item.tableId,
        tableNumber: item.tableNumber,
        seats: item.seats,
        status: item.status,
        orders: item.orders,
        reservations: item.reservations
      }));
    } else {
      return {
        Id: data.tableId,
        tableNumber: data.tableNumber,
        seats: data.seats,
        status: data.status,
        orders: data.orders,
        reservations: data.reservations
      };
    }
  };
const urlOpt = process.env.REACT_APP_API_PATH + process.env.REACT_APP_COMPONENT_TABLE;
const componentOpt = process.env.REACT_APP_COMPONENT_DETAIL;
const ModalOpt = {
    title: 'Xác nhận xóa',
    mes: 'Bạn có chắc chắn muốn xóa bàn:',
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
    { label: 'Bàn Số', type: 'number', placeholder: '1,2,3..', feedBack: 'Hãy nhập số bàn', key: 'tableNumber' },
    { label: 'Chỗ ngồi', type: 'number', placeholder: 'số người ngồi', feedBack: 'Hãy nhập số người ngồi', key: 'seats' },
    { label: 'Tình trạng', type: 'text', placeholder: 'Trống, đã đặt, Đã có người', feedBack: 'Tình trạng', key: 'status' },
  ];

setOptions({
    transformCustomerData: transformCustomerDataOpt,
    url: urlOpt,
    component: componentOpt,
    ModalOpt: ModalOpt,
    DataTableOpt: DataTableOpt,
    formOpt: formOpt
  });

const TableOptions = {...builderOptions} ;

export default TableOptions

