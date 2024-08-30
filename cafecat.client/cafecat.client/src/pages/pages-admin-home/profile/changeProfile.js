import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function ChangeProfile() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [validated, setValidated] = useState(false);
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    role: userData.role,
    employeeId: userData.employeeId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      fetch(process.env.REACT_APP_API_ENDPOINT_PROFILE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
            if(response.ok){
                alert("Cập nhập thành công");
                let newUserData ={
                    ...userData,
                    firstName:formData.firstName,
                    lastName:formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    role: formData.role,
                }
                localStorage.setItem('userData', JSON.stringify(newUserData));
                //navigate(`${process.env.REACT_APP_PATH_HOME}/${process.env.REACT_APP_COMPONENT_PROFILE}`)
                navigate(0);
            }else{
                alert("Cập nhập thất bại");
            }
        })
        .catch((err) => {
          alert(`An error occurred: ${err.message}. Please try again later.`);
        });

    }

    setValidated(true);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group controlId="formFirstName" className="mt-2">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formLastName" className="mt-2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formEmail" className="mt-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPhoneNumber" className="mt-2">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Hãy nhập giá trị hợp lệ
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formRole" className="mt-2">
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmployeeId" className="mt-2">
        <Form.Label>Employee Id</Form.Label>
        <Form.Control
          type="number"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          disabled
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2">
        Submit
      </Button>
    </Form>
  );
}

export default ChangeProfile;
