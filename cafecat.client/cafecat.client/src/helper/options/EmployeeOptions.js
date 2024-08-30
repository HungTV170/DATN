import builderOptions, { setOptions } from './IBuilderOptions';

const transformCustomerDataOpt = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        Id: item.employeeId,
        orders: item.orders,
        apiUser: item.apiUser,
        phoneNumber: item.phoneNumber,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        role: item.role
      }));
    } else {
      return {
        Id: data.employeeId,
        orders: data.orders,
        apiUser: data.apiUser,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role
      };
    }
  };
const urlOpt = process.env.REACT_APP_API_PATH + process.env.REACT_APP_COMPONENT_EMPLOYEE;
const componentOpt = process.env.REACT_APP_COMPONENT_DETAIL;
const ModalOpt = {
    title: 'Xác nhận xóa',
    mes: 'Bạn có chắc chắn muốn xóa nhân viên:',
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
    { label: 'Họ', type: 'text', placeholder: 'Trần Văn', feedBack: 'Hãy nhập tên của Họ', key: 'firstName' },
    { label: 'Tên', type: 'text', placeholder: 'A', feedBack: 'Hãy nhập tên của Tên', key: 'lastName' },
    { label: 'Email', type: 'email', placeholder: 'example@gmail.com', feedBack: 'Hãy nhập địa chỉ email', key: 'email' },
    { label: 'Số điện thoại', type: 'text', placeholder: '000-000-0000', feedBack: 'Hãy nhập số điện thoại', key: 'phoneNumber' },
    { label: 'Vị Trí', type: 'text', placeholder: 'Chef', feedBack: 'Vị Trí', key: 'role' }
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

