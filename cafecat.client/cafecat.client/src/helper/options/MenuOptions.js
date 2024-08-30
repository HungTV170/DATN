import builderOptions, { setOptions } from './IBuilderOptions';

const transformCustomerDataOpt = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        Id: item.itemId,
        orderItems: item.orderItems,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        img: item.itemImg
      }));
    } else {
      return {
        Id: data.itemId,
        orderItems: data.orderItems,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        img: data.itemImg
      };
    }
  };
const urlOpt = process.env.REACT_APP_API_PATH + process.env.REACT_APP_COMPONENT_MENU;
const componentOpt = process.env.REACT_APP_COMPONENT_DETAIL;
const ModalOpt = {
    title: 'Xác nhận xóa',
    mes: 'Bạn có chắc chắn muốn xóa mặt hàng:',
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
    { label: 'name', type: 'text', placeholder: 'name...', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'name' },
    { label: 'price', type: 'number', placeholder: 'price...', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'price' },
    { label: 'category', type: 'text', placeholder: 'category...', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'category' },
    { label: 'description', type: 'ckeditor', placeholder: 'description...', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'description' },
    { label: 'Image', type: 'file', placeholder: 'Image...', feedBack: 'Hãy nhập giá trị hợp lệ', key: 'ImgFile' },
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

