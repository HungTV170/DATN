import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenterNewPassword, setReenterNewPassword] = useState('');
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const token = localStorage.getItem('jwt');
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (newPassword !== reenterNewPassword) {
      setShow(true);
    } else {
      setShow(false);
    }

    if (form.checkValidity() === true && newPassword === reenterNewPassword) {

      fetch(process.env.REACT_APP_API_ENDPOINT_CHANGEPASS, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OldPassword:currentPassword,
          NewPassword:newPassword
        }),
      }).then(response =>{
        return response.json();
      }).then(data =>{
        alert(`${data.message}`);
      })
      .catch(err =>{
        alert(`An error occurred :${err.message}. Please try again later.`);
      })

    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mt-4" as={Row} controlId="formCurrentPassword">
        <Form.Label column sm={4}>
          Current Password
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            required
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Nhập Giá Trị Hợp Lệ
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group className="mt-4" as={Row} controlId="formNewPassword">
        <Form.Label column sm={4}>
          New Password
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            required
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Nhập Giá Trị Hợp Lệ
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group className="mt-4" as={Row} controlId="formReenterNewPassword">
        <Form.Label column sm={4}>
          Re-enter New Password
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            required
            type="password"
            value={reenterNewPassword}
            onChange={(e) => setReenterNewPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Nhập Giá Trị Hợp Lệ
          </Form.Control.Feedback>
          {show && (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible className="mt-3">
                Re-entered Password do not match. Please try again.
            </Alert>
          )}
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Change Password
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
