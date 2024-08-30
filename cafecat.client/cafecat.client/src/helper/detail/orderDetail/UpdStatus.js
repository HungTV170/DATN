import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdStatus = ({ localApiData,setData}) => {
  const [formData, setFormData] = useState({
    customerId: localApiData.customerId,
    tableId: localApiData.tableId,
    employeeId: localApiData.employeeId,
    statusId: localApiData.statusId
  });

  const token = localStorage.getItem('jwt');
  
  const [status ,setStatus] = useState('');
  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      statusId: e.target.value
    });
    switch(e.target.value){
        case '0': setStatus("Pending");break;
        case '1': setStatus("Processing");break;
        case '2': setStatus("Completed");break;
        case '3': setStatus("Cancelled");break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_ORDER}/${localApiData.Id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if(response.ok){
            let tmp = {...localApiData};
            tmp.statusId = formData.statusId;
            tmp.status = status;
            setData(tmp);
            alert("Cập Nhập Thành Công")
        }else{
            throw new Error("Có lỗi");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Cập Nhập Thất bại");
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <Form.Label>Trạng Thái: {localApiData.status}</Form.Label>
      <Form.Select 
        aria-label="Default select example"
        value={formData.statusId}
        onChange={handleSelectChange}
      >
        <option value="0">Pending</option>
        <option value="1">Processing</option>
        <option value="2">Completed</option>
        <option value="3">Cancelled</option>
      </Form.Select>
      <Button variant="primary" type="submit" className="mt-2">
        Cập Nhật Trạng Thái
      </Button>
    </Form>
  );
};

export default UpdStatus;
