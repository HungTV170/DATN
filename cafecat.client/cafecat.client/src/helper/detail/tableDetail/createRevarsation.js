import { useApiServices } from '../../../services/Api-services';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import TimeInput from './timeInput';
const url = process.env.REACT_APP_API_PATH + process.env.REACT_APP_COMPONENT_RESERVATION;

const CreateReversation = ({ id }) => {
  const { Create } = useApiServices(url, (data) => data);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    tableId: id,
    numberOfPeople: '',
    Date: '',
    time:'',
    reservationTime: ''
  });

  const handleChange = (content, key) => {
    const newFormData = {
      ...formData,
      [key]: content
    };
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    let send={
      customerId: formData['customerId'],
      tableId: formData['tableId'],
      numberOfPeople: formData['numberOfPeople'],
      reservationTime: formData['reservationTime'],
      reservationDate: formData['Date']+"T"+formData['time'],

    }
    console.log(send);
    Create(send);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Bàn số</InputGroup.Text>
        <Form.Control
          required
          type="number"
          value={formData['tableId'] || ''}
          disabled
        />
        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Id Khách hàng</InputGroup.Text>
        <Form.Control
          required
          type="number"
          placeholder="...."
          value={formData['customerId'] || ''}
          onChange={(e) => handleChange(e.target.value, 'customerId')}
        />
        <Form.Control.Feedback type="invalid">
          Nhập Giá Trị Hợp Lệ
        </Form.Control.Feedback>
        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>

        <InputGroup.Text id="basic-addon1">Số người</InputGroup.Text>
        <Form.Control
          required
          type="number"
          placeholder="...."
          value={formData['numberOfPeople'] || ''}
          onChange={(e) => handleChange(e.target.value, 'numberOfPeople')}
        />
        <Form.Control.Feedback type="invalid">
          Nhập Giá Trị Hợp Lệ
        </Form.Control.Feedback>
        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Ngày</InputGroup.Text>
        <Form.Control
          required
          type="date"
          value={formData['Date'] || ''}
          onChange={(e) => handleChange(e.target.value, 'Date')}
        />
        <Form.Control.Feedback type="invalid">
          Nhập Giá Trị Hợp Lệ
        </Form.Control.Feedback>
        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
        <InputGroup.Text id="basic-addon1">Giờ</InputGroup.Text>
        <Form.Control
          required
          type="time"
          value={formData['time'] || ''}
          onChange={(e) => handleChange(e.target.value, 'time')}
        />
        <Form.Control.Feedback type="invalid">
          Nhập Giá Trị Hợp Lệ
        </Form.Control.Feedback>
        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
    </InputGroup>


    <TimeInput handleChange={handleChange}/>

      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Đồng ý với các điều khoản"
          feedback="Bạn phải đồng ý với các điều khoản trước khi nhấn."
          feedbackType="invalid"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateReversation;
