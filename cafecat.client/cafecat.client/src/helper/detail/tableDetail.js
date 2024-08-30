import IForm from '../../components/public-component/form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreatRev from './tableDetail/createRevarsation';
const customerDetail = ({ localApiData, formOptions,UpdateById, handleApiDataChange }) => {
    return (
        <Container>
        <Row >
          <Col xl={4}>
            <Card>
              <Card.Body className ="pt-4 d-flex flex-column align-items-center">
                <Card.Title>Thông tin chi tiết</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Bàn Số :
                </Card.Subtitle>
                <Card.Text className ="mt-2 mb-5">
                  {`${localApiData.tableNumber}`}
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
                      <p>tableNumber: {localApiData.tableNumber}</p>
                      <p>seats: {localApiData.seats}</p>
                      <p>status: {localApiData.status}</p>
                    </div>
                  </Tab>
                  <Tab eventKey="update" title="Đặt Bàn">
                    {/* <IForm 
                      col={formOptions} 
                      Id={localApiData.Id}
                      method={UpdateById} 
                      apiData={localApiData} 
                      onApiDataChange={handleApiDataChange}
                    /> */}
                    <CreatRev id={localApiData.Id}/>
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