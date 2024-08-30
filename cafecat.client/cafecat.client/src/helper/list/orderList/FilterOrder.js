import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

function Example({getFilter}) {
  const [show, setShow] = useState(false);
  const [Filter, setFilter] = useState({
    CUSTOMER: '',
    PHONE: '',
    TABLE: '',
    EMPLOYEE: '',
    STATUS: '',
    TIME: '',
  });

  const handleChange = (content, key) => {
    const newFilter = {
      ...Filter,
      [key]: content,
    };
    setFilter(newFilter);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    getFilter(Filter)
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-filter"></i>
        Bộ Lọc
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lọc Đơn Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Khách Hàng</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="John Doe"
                autoFocus
                value={Filter['CUSTOMER']}
                onChange={(e) => handleChange(e.target.value, 'CUSTOMER')}
              />
              <InputGroup.Text id="basic-addon1">Số Điện Thoại</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="0706337202"
                value={Filter['PHONE']}
                onChange={(e) => handleChange(e.target.value, 'PHONE')}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Nhân Viên</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Alice Green"
                value={Filter['EMPLOYEE']}
                onChange={(e) => handleChange(e.target.value, 'EMPLOYEE')}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Bàn</InputGroup.Text>
              <Form.Control
                type="number"
                min="0"
                placeholder="1"
                value={Filter['TABLE']}
                onChange={(e) => handleChange(e.target.value, 'TABLE')}
              />
              <InputGroup.Text id="basic-addon1">Trạng Thái</InputGroup.Text>
              <Form.Select
                value={Filter['STATUS']}
                onChange={(e) => handleChange(e.target.value, 'STATUS')}
              >
                <option value="">Chọn trạng thái</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Phạm Vi</InputGroup.Text>
              <Form.Select
                value={Filter['TIME']}
                onChange={(e) => handleChange(e.target.value, 'TIME')}
              >
                <option value="">Thời gian</option>
                <option value="Hôm nay">Hôm nay</option>
                <option value="7 Ngày Trước">7 Ngày Trước</option>
                <option value="Tất cả">Tất cả</option>
              </Form.Select>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
