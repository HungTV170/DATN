import FormWithFile from '../../components/public-component/formWithFile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
const menuDetail = ({ localApiData, formOptions,UpdateById, handleApiDataChange }) => {
    return (
        <Container>
        <Row >
          <Col xl={4}>
            <Card>
              <Card.Body className ="pt-4 d-flex flex-column align-items-center">
                <Card.Title>Thông tin chi tiết</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Món ăn Số :
                </Card.Subtitle>
                <Card.Text className ="mt-2 mb-5">
                  <Image 
                    src={`${process.env.REACT_APP_API_UPLOAD}/${localApiData.img}`}
                    roundedCircle 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                  />
                </Card.Text>
                <Card.Text className ="mb-5">
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
                  <div>
                    <div>
                        <strong>ID:</strong> <span>{localApiData.Id}</span>
                    </div>
                    {/* <div>
                        <strong>Order Items:</strong> <span>{localApiData.orderItems}</span>
                    </div> */}
                    <div>
                        <strong>Name:</strong> <span>{localApiData.name}</span>
                    </div>
                    <div>
                        <strong>Description:</strong>
                        <div dangerouslySetInnerHTML={{ __html: localApiData.description }} />
                    </div>
                    <div>
                        <strong>Price:</strong> <span>{localApiData.price}</span>
                    </div>
                    <div>
                        <strong>Category:</strong> <span>{localApiData.category}</span>
                    </div>

                </div>

                  </Tab>
                  <Tab eventKey="update" title="Sửa">
                    <FormWithFile 
                      col={formOptions} 
                      Id={localApiData.Id}
                      method={UpdateById} 
                      apiData={localApiData} 
                      onApiDataChange={handleApiDataChange}
                    />
                  </Tab>    
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  };
  
  export default menuDetail;