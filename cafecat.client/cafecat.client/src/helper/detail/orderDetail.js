import IForm from '../../components/public-component/form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdStatus from './orderDetail/UpdStatus';
import ListFood from './orderDetail/ListFood';
import DetailOrder from './orderDetail/DetailOrder';
import UpdItem from './orderDetail/UpdItem';
import Payment from './orderDetail/Payment';
const orderDetail = ({ localApiData, formOptions,UpdateById, handleApiDataChange }) => {
    return (
      <Container>
        <Row >
          <Col xl={4}>
            <Card>
              <Card.Body className ="pt-4 d-flex flex-column align-items-center">
                <Card.Title>Thông tin chi tiết</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Đơn Hàng
                </Card.Subtitle>
                <img src={`${process.env.PUBLIC_URL}/assets/img/Account.jpg`} alt="Account" 
                    className="rounded-circle" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                <Card.Text className ="">
                  {`${localApiData.Id}`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={8}>
            <Card>
              <Card.Body>
                <Tabs
                  defaultActiveKey="detail"
                  id="uncontrolled-tab-example"
                  className="mb-3 custom-tabs "
                  fill
                >
                  <Tab eventKey="detail" title="Chi tiết">
                    <DetailOrder localApiData={localApiData}/>
                  </Tab>
 
                  <Tab eventKey="orderItems" title="DS Món Ăn">
                    <ListFood localApiData = {localApiData}/>
                  </Tab>
                  <Tab eventKey="payment" title="Thanh Toán">
                    {/* <div>
                      { localApiData.payment == null?
                      "Chưa thực hiện thanh toán":
                      `paymentDate: ${localApiData.payment.paymentDate} |
                      paymentMethod: ${localApiData.payment.paymentMethod} |
                      amount: ${localApiData.payment.amount}`}
                    </div> */}
                    <Payment localApiData = {localApiData}/>
                  </Tab>
                  <Tab eventKey="status" title="Trạng thái">   
                        <UpdStatus 
                        localApiData = {localApiData}
                        setData = {handleApiDataChange}
                        />         
                  </Tab>

                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <UpdItem
          localApiData={localApiData}
          handleApiDataChange = {handleApiDataChange}
        />
      </Container>
    );
  };
  
  export default orderDetail;