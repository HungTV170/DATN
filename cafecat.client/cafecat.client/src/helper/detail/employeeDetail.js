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
                  Nhân Viên
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
                      <p>Role: {localApiData.role}</p>
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
                  <Tab eventKey="action" title="Hoạt động">
                    <span>Coming soon ....</span>
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