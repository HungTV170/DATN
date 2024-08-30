import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useAlert } from '../../../services/AlertContext';

const OrderForm = ({setOrder}) => {
  const addAlert = useAlert();
  const [isTable,setTable] = useState(true);
  let employee = localStorage.getItem('userData');
  employee = JSON.parse(employee);
  const [formData, setFormData] = useState({
    customerId: '',
    tableId: '',
    employeeId: employee.employeeId,
    statusId: '',
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeTable = (e) =>{
    const { name, value } = e.target;

    const regex = /^\d+(,\d+)*$/;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (regex.test(value)) {
      setError('');  
    } else {
      setError('chọn nhiều bàn theo format 1,2,3...'); 
    }
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    setValidated(true);

    if (form.checkValidity() === false || error !== '') {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault(); 
      setOrder(formData);
      addAlert(`đã lưu chi tiết, xác nhận lại để tạo đơn hàng `, '4');
    }
  };

  function setNoTable(event){
    event.preventDefault();
    event.stopPropagation();
    setFormData({
      ...formData,
      ["tableId"]: '',
    });
    console.log(formData);
    setTable(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="formcustomerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Customer ID"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeeId">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          disabled
          required
        />
        <Form.Control.Feedback type="invalid">
        Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formstatusId">
        <Form.Label>Status</Form.Label>
        <Form.Select
          aria-label="Select Status"
          name="statusId"
          value={formData.statusId}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="0">Pending</option>
          <option value="1">Processing</option>
          <option value="2">Completed</option>
          <option value="3">Cancelled</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
        Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formtableId">
        <Form.Label>
          <span onClick={()=>setTable(true)}>Table</span>
        </Form.Label>
        {isTable ? (
          <>
            <Form.Control 
              type="text" 
              placeholder="Table ID"
              name="tableId"
              value={formData.tableId}
              onChange={handleChangeTable}
              required
            />
        <Form.Control.Feedback type="invalid">
        Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
        {error && <p style={{ color: 'red' }}>{error}</p>}
          </>
        ) : (
          <Form.Control 
            type="text" 
            placeholder="Mang Về"
            name="tableId"
            value={formData.tableId}
            disabled
          />
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formtableId">
        <i>Chưa có bàn?  
          <Link to ={`${process.env.REACT_APP_PATH_HOME}/${process.env.REACT_APP_COMPONENT_TABLE}`}>
            đặt bàn
          </Link>
          {" hoặc "}
          <a href="#" onClick={setNoTable}>Mang Về?</a>
        </i>
      </Form.Group>

      <Button variant="primary" type="submit">
        Lưu
      </Button>
    </Form>
  );
};

export default OrderForm;
