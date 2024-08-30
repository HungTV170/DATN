import IForm from '../../components/public-component/form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const customerDetail = ({ localApiData, formOptions,UpdateById, handleApiDataChange }) => {
    return (
        <Container>
        <Row >
          <Col xl={4}>
            <Card>
              <Card.Body className ="pt-4 d-flex flex-column align-items-center">
                <Card.Title>Thông tin chi tiết</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Khách Hàng
                </Card.Subtitle>
                <img src={`${process.env.PUBLIC_URL}/assets/img/Account.jpg`} alt="Account" 
                    className="rounded-circle" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                <Card.Text className ="mt-2 mb-5">
                  {`${localApiData.firstName} ${localApiData.lastName}`}
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
                    <div>
                      <p>ID: {localApiData.Id}</p>
                      <p>Name: {localApiData.firstName} {localApiData.lastName}</p>
                      <p>Email: {localApiData.email}</p>
                      <p>Phone: {localApiData.phoneNumber}</p>
                      <p>Address: {localApiData.address}</p>
                      {/* <p>Orders: {localApiData.orders}</p> */}
                      {/* <p>Reservations: {localApiData.reservations}</p> */}
                    </div>
                  </Tab>
                  <Tab eventKey="update" title="Sửa">
                    <IForm 
                      col={formOptions} 
                      Id={localApiData.Id}
                      method={UpdateById} 
                      apiData={localApiData} 
                      onApiDataChange={handleApiDataChange}
                    />
                  </Tab>    
                  <Tab eventKey="Orders" title="Đơn Hàng">
                    {
                      localApiData.orders.length === 0  
                      ? "Khách hàng chưa thực hiện đơn hàng nào cả" 
                      : 
                      localApiData.orders.map((item, index) => (
                        <div key={index}>
                          {
                            `Đơn hàng: ${item.orderId} |Ngày Đặt: ${item.orderDate} |Trạng Thái: ${item.status}`
                          }
                          <hr />
                        </div>
                      ))
                    }
                  </Tab>

                  <Tab eventKey="Reservations" title="Lịch sử đặt bàn">
                  {
                      localApiData.reservations.length === 0  
                      ? "Khách hàng chưa thực hiện đặt chỗ ở nhà hàng" 
                      : 
                      localApiData.reservations.map((item, index) => (
                        <div key={index}>
                            <Row>
                              <Col>{`Ngày Đặt: ${item.reservationDate}`}</Col>
                              <Col>{`Thời gian: ${item.reservationTime}`}</Col>
                            </Row>
                            <Row>
                              <Col>{`Bàn số: ${item.tableId}`}</Col>
                              <Col>{`Số người: ${item.numberOfPeople}`}</Col>
                            </Row>
                          <hr />
                        </div>
                      ))
                    }
                  </Tab>              
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  };
  
  export default customerDetail;