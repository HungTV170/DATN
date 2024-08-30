const builderOptions = {
    transformCustomerData: function() {},
    url: '',
    component: '',
    ModalOpt: {
      title: '',
      mes: '',
      show: false,
      handleClose: () => {},
      confirmButton: false,
      onConfirm: null
    },
    DataTableOpt: {},
    formOpt: []
  };
  
  export const setOptions = (options) => {
    for (const [key, value] of Object.entries(options)) {
      if (builderOptions.hasOwnProperty(key)) {
        builderOptions[key] = value;
      } else {
        console.error(`Key ${key} does not exist in builderOptions`);
      }
    }
  };
  
  export default builderOptions;  