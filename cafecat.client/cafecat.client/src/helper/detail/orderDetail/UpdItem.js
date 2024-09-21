import { useApiServices } from '../../../services/Api-services';
import opt from '../../options/MenuOptions';
import {CreateFieldForm} from '../../../pages/pages-admin-home/Order/useCreateFieldForm';
import FieldForm from '../../../pages/pages-admin-home/Order/FieldForm';
import OrderForm from '../../../pages/pages-admin-home/Order/OrderForm';
import Confirm from './Confirm';
import React, { useEffect,useState } from 'react';
import { Form, Button, Row, Col, Card ,Tab,Nav} from 'react-bootstrap';
const UpdItem = ({handleApiDataChange,localApiData}) =>{
    const {GetAll,apiDatas, error, loading} = useApiServices(opt.url, opt.transformCustomerData);
    const [order,setOrder] = useState({});
    const [orderItem,setOrderItem] = useState([]);
    let InitialFields =localApiData.orderItems.map(e=>({
      label:e.menuItem,
      value:e.quantity,
      id:e.itemId
    }));
    const {        
        fields,
        handleAddField,
        handleChange,
        handleRemoveField,
        handleSubmit
      } = CreateFieldForm(setOrderItem,InitialFields );

    useEffect(() => {
        GetAll();
      }, []);

    if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (loading) {
        return <>Loading...</>;
      }
    
      if(localApiData.status === 'Cancelled'||  localApiData.status === 'Completed'){
        return <></>
      }
    return<>
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
                  <Card.Title>Chi tiết đơn</Card.Title>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                          <FieldForm
                            {...{
                              fields,
                              handleChange,
                              handleRemoveField,
                              handleSubmit
                            }}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <Confirm
                            {...{order,orderItem,handleApiDataChange,localApiData}}
                            />
                          </Tab.Pane>
                        </Tab.Content>
                    </Row>
                    <Row>
                    <Nav>
                          <Nav.Item>
                            <Nav.Link eventKey="first">Chọn Món</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Xác Nhận</Nav.Link>
                          </Nav.Item>
                        </Nav>
                    </Row>
                  </Tab.Container>
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </>
}
export default UpdItem