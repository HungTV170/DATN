import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const MyForm = ({ table }) => {
  // State để lưu trữ dữ liệu form và thông báo lỗi
  const [formData, setFormData] = useState({ table: table });
  const [error, setError] = useState('');

  // Hàm xử lý sự thay đổi của input
  const handleChangeTable = (e) => {
    const { name, value } = e.target;

    // Biểu thức chính quy để kiểm tra định dạng số, ví dụ: "1,2,3"
    const regex = /^\d+(,\d+)*$/;

    // Cập nhật giá trị của trường nhập liệu trong state
    setFormData({
      ...formData,
      [name]: value,
    });

    // Kiểm tra giá trị theo định dạng
    if (regex.test(value)) {
      setError(''); // Xóa lỗi nếu giá trị hợp lệ
    } else {
      setError('Chọn nhiều bàn theo định dạng 1,2,3...'); // Thông báo lỗi nếu giá trị không hợp lệ
    }
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Chuyển đổi giá trị của trường nhập liệu thành mảng số nguyên
    const tableArray = formData.table.split(',').map(num => parseInt(num.trim(), 10));

    // Kiểm tra nếu giá trị không hợp lệ
    if (tableArray.some(isNaN)) {
      setError('Dữ liệu không hợp lệ.');
      return;
    }

    try {
      // Gửi yêu cầu PUT với fetch
      const response = await fetch('https://yourapi.com/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableIds: tableArray,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(`Submitted value: ${tableArray}`);
      console.log('Update successful:', data);
    } catch (error) {
      console.error('There was an error updating the order!', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTable" className="mb-3">
          <Form.Label>Table:</Form.Label>
          <Form.Control 
            type="text" 
            name="table" // Tên của trường nhập liệu
            placeholder="Nhập các ID bàn cách nhau bằng dấu phẩy" 
            value={formData.table} 
            onChange={handleChangeTable} 
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>} {/* Hiển thị lỗi nếu có */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Lưu
        </Button>
      </Form>
    </Container>
  );
};

export default MyForm;
