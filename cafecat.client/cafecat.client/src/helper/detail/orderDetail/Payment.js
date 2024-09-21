
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";


function Payment({localApiData}) {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedOption,setSelectedOption] =useState("Tiền Mặt");
  const amount = localApiData.orderItems.reduce((result,item)=>{return result+item.quantity*item.price;},0);

  const orderId = localApiData.Id;
  const [FormData,setFormData] = useState({
    orderId:orderId,
    amount:amount,
    paymentMethod:selectedOption
  })

  console.log(amount);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = (event) => {
    const newFormData = {
    orderId:orderId,
    amount:amount,
      ["paymentMethod"]: selectedOption
    };
    setFormData(newFormData);
    const token = localStorage.getItem('jwt');
    fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_PAYMENT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId:orderId,
        amount:amount,
        paymentMethod:selectedOption
      })
    }).then(response =>{
      if(response.ok){
        alert("Thanh toán thành công");
        Navigate(`${process.env.REACT_APP_PATH_HOME}/${process.env.REACT_APP_COMPONENT_ORDER}`)
      }else{
        throw new Error("Có lỗi");
      }
    }).catch((error)=>{
      alert("Tạo Thất bại");
    })
  };

  if(localApiData.status === 'Cancelled'){
    return <i>ĐƠN HÀNG ĐÃ BỊ HỦY</i>
  }

  if(localApiData.payment == null)

    return (<>
        <i><a href="#" onClick={handleShow}>THỰC HIỆN THANH TOÁN</a></i>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>HÓA ĐƠN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Khách Hàng</InputGroup.Text>
                <Form.Control value={localApiData.customer} disabled />
                <InputGroup.Text>SDT</InputGroup.Text>
                <Form.Control value={localApiData.sdt} disabled />
                <InputGroup.Text>Bàn</InputGroup.Text>
                <Form.Control value={localApiData.table} disabled />
              </InputGroup>
    
              <InputGroup className="mb-3">
                <InputGroup.Text>Người Tạo</InputGroup.Text>
                <Form.Control value={localApiData.employee} disabled />
                <InputGroup.Text>Thời Gian</InputGroup.Text>
                <Form.Control value={new Date(localApiData.orderDate).toLocaleString()} disabled />
              </InputGroup>
    
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {localApiData.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.itemId}</td>
                      <td>{item.menuItem}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}>TỔNG GIÁ TRỊ</td>
                    <td>{amount}</td>
                  </tr>
                </tbody>
              </Table>
    
              <InputGroup className="mb-3">
                <InputGroup.Text>Phương Thức Thanh Toán</InputGroup.Text>
                <Form.Select
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                >
                  <option value="Tiền Mặt">Tiền Mặt</option>
                  <option value="Chuyển Khoản">Chuyển Khoản</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn phương thức thanh toán.
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              THANH TOÁN
            </Button>
          </Modal.Footer>
        </Modal></>
      );

  return  (  
    <Form>
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="">Khách Hàng</InputGroup.Text>
          <Form.Control
          value={localApiData.customer} style={{ marginRight: '20px' }}
          disabled
          />
          <InputGroup.Text id="basic-addon1">SDT</InputGroup.Text>
          <Form.Control
          value={localApiData.sdt} style={{ marginRight: '20px' }}
          disabled
          />
          <InputGroup.Text id="basic-addon1">Bàn</InputGroup.Text>
          <Form.Control
          value={localApiData.table}
          disabled
          />
      </InputGroup>
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Người Tạo</InputGroup.Text>
          <Form.Control
          value={localApiData.employee} style={{ marginRight: '20px' }}
          disabled
          />
          <InputGroup.Text id="basic-addon1">Thời Gian</InputGroup.Text>
          <Form.Control
          value={new Date(localApiData.orderDate)}
          disabled
          />
      </InputGroup>
      <Table striped bordered hover>
          <thead>
              <tr>
                  <th>#</th>
                  <th>itemId</th>
                  <th>itemName</th>
                  <th>quantity</th>
                  <th>price</th>
              </tr>
          </thead>
          <tbody>
          {localApiData.orderItems.map((item, index) => (
              <tr key={index}>
              <td>{item.orderItemId}</td>
              <td>{item.itemId}</td>
              <td>{item.menuItem}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              </tr>
          ))}
          <tr>
              <td colSpan={4}>
                  TỔNG GIÁ TRỊ
              </td>
              <td>
                  {amount}
              </td>

          </tr>
          </tbody>
      </Table>     
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Phương Thức Thanh Toán</InputGroup.Text>
          <Form.Control
          value={localApiData.payment.paymentMethod}
          disabled
          />
      </InputGroup>         
  </Form>)


}

export default Payment;