import Modal from '../../components/public-component/modal';
import IForm from '../../components/public-component/form';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FreeTime from '../../pages/pages-admin-home/reversation/FreeTime';

const tableList = ({ 
  handleTableClick, 
  apiDatas,
  modalTitle, 
  showModal, 
  modalMessage, 
  confirmButton,
  onConfirm,
  handleCloseModal ,
  Create,
  formOptions,
  handleApiDataChange,
  
}) => {

    return(
<> 
<Modal
  title={modalTitle}
  mes={modalMessage}
  show={showModal}
  handleClose={handleCloseModal}
  confirmButton={confirmButton}
  onConfirm={onConfirm}
/>
<Card>
  <Card.Body className ="pt-4 d-flex flex-column align-items-center">
    <Card.Title> DANH SÁCH CÁC BÀN</Card.Title>
    <div className="mt-2 mb-5">
      <Row>
        {apiDatas.map((apiData, index) => (
          <Col xs={12} md={4} lg={4} key={index} className="mb-4">
            <Card className="text-center">
            <Card.Img 
              src={`${process.env.PUBLIC_URL}/assets/img/table${Math.floor(Math.random() * 3) + 1}.jpg`} 
              alt="Card image" 
            />
            <Card.ImgOverlay >
              <Card.Body>
                <Card.Title>Bàn {apiData.tableNumber}</Card.Title>
                <Card.Text>
                  <strong>Số lượng chỗ:</strong> {apiData.seats} <i className="bi bi-person"></i>
                </Card.Text>
                <Card.Text>
                <strong>Tình trạng:</strong> {apiData.status}
                  {apiData.status === 'Available' ? (
                    <i className="bi bi-check-circle" style={{ color: 'green' }}></i> // Biểu tượng hoàn thành
                  ) : (
                    <i className="bi bi-hourglass" style={{ color: 'orange' }}></i> // Biểu tượng đang xử lý
                  )}
                </Card.Text>
                <Link to={`detail/${apiData.Id}?date=${new Date().toLocaleDateString()}`}>
                  <Button variant="outline-primary">Đặt Bàn</Button>
                </Link>
              </Card.Body>
            </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </Card.Body>
</Card>
<Card>
  <Card.Body>
  <FreeTime dateTime={new Date().toLocaleDateString('en-CA')}/>
  </Card.Body>
</Card>

</>
    )
}

export default tableList;