import React, { useState } from 'react';
import { useAlert } from '../../../services/AlertContext';
export function CreateFieldForm(setOrderItem, InitialFields = []){
    const [fields, setFields] = useState(InitialFields);
    const addAlert = useAlert();
    const handleAddField = (id, name) => {
      const isIdExist = fields.some((field) => field.id === id);
      if (!isIdExist) {
        setFields([...fields, { value: 1, label: name, id: id }]);
        addAlert(`thêm ${name } thành công!`, '1');
        return 0;
      } 
      addAlert(`đã có  ${name } `, '2');
    };
    
  
    const handleChange = (index, event) => {
      const newFields = fields.map((field, i) => {
        if (i === index) {
          return { ...field, value: event.target.value };
        }
        return field;
      });
      setFields(newFields);
    };
  
    const handleRemoveField = (id) => {
      setFields(fields.filter((field) => field.id !== id));
      addAlert(`đã bỏ món ăn khỏi đơn `, '4');
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitted data:', fields);
      setOrderItem(fields);
      addAlert(`đã lưu chi tiết, xác nhận lại để tạo đơn hàng `, '4');
    };
    return{
        fields,
        handleAddField,
        handleChange,
        handleRemoveField,
        handleSubmit
    }
}