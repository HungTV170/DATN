import Modal from '../../../components/public-component/modal';
import { Form, Button, Row, Col, Card ,Tab,Nav} from 'react-bootstrap';
import OrderForm from './OrderForm';
import FieldForm from './FieldForm';
import Confirm from './Confirm';
import {CreateFieldForm} from './useCreateFieldForm';
import React, { useState } from 'react';
const MenuTableList = ({
  handleTableClick,
  apiDatas,
  modalTitle,
  showModal,
  modalMessage,
  confirmButton,
  onConfirm,
  handleCloseModal,
  Create,
  formOptions,
  handleApiDataChange,
}) => {

  const [order,setOrder] = useState({});
  const [orderItem,setOrderItem] = useState([]);
  const {        
    fields,
    handleAddField,
    handleChange,
    handleRemoveField,
    handleSubmit
  } = CreateFieldForm(setOrderItem);

  return (
    <>
      {/* <Modal
        title={modalTitle}
        mes={modalMessage}
        show={showModal}
        handleClose={handleCloseModal}
        confirmButton={confirmButton}
        onConfirm={onConfirm}
      /> */}
      <Row>
        <Col xs={12} md={8} lg={8}>
          <Row>
            {apiDatas.map((apiData, index) => (
              <Col xs={4} md={3} lg={3} key={index} className="mb-4">
                <Card className="text-center">
                  <Card.Img
                    src={`${process.env.REACT_APP_API_UPLOAD}/${apiData.img}`}
                    alt="Card image"
                  />
                  <Card.Body>
                    <Card.Title>{apiData.name}</Card.Title>
                    <Card.Text>
                      <strong>Giá:</strong> {apiData.price}
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleAddField(apiData.Id ,apiData.name)}
                    >
                      Lựa Chọn
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} md={4} lg={4}>
            <Card>
                <Card.Body>
                  <Card.Title>Gọi Món</Card.Title>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Tab.Content>
                          <Tab.Pane eventKey="second">
                          <FieldForm
                            {...{
                              fields,
                              handleChange,
                              handleRemoveField,
                              handleSubmit
                            }}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="first">
                            <OrderForm
                            {...{
                                setOrder
                              }
                            }
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="three">
                            <Confirm
                            {...{order,orderItem}}
                            />
                          </Tab.Pane>
                        </Tab.Content>
                    </Row>
                    <Row>
                    <Nav>
                          <Nav.Item>
                            <Nav.Link eventKey="first">Thông Tin</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Chọn Món</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="three">Xác Nhận</Nav.Link>
                          </Nav.Item>
                        </Nav>
                    </Row>
                  </Tab.Container>
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default MenuTableList;
