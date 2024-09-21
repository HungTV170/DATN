import Modal from '../../components/public-component/modal';
import IForm from '../../components/public-component/form';
import './../../assets/css/customerStyle.css';
import { Card } from 'react-bootstrap';
import FreeTime from '../../pages/pages-admin-home/reversation/FreeTime';

const CustomerList = ({ 
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
<div className="card">
  <div className="card-body">
    <h5 className="card-title"> DANH SÁCH THỜI GIAN ĐẶT BÀN</h5>
    <div className="row">
      <div className="col-lg-9">
        <p>Nhấn vào từng khoảng thời gian để hiển thị chi tiết</p>
      </div>
      <div className="col-lg-3 mb-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Đặt Bàn
              </button>
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <IForm 
              col={formOptions} 
              Id={null}
              method={Create} 
              apiData={apiDatas} 
              onApiDataChange={handleApiDataChange}
            />
          </div>
        </div>
      </div>
    </div>
    <div className='overflowX' onClick={handleTableClick}>
    <table id="myTable" className="table datatable ">
      <thead>
        <tr>
          <th>#</th>
          <th>ID KH</th>
          <th>Họ & Tên</th>
          <th>SDT</th>
          <th>ID Bàn</th>
          <th>Ngày/Giờ</th>
          <th>Thời Gian</th>
          <th></th>
        </tr>
      </thead>
      <tbody  >
        {apiDatas.map(apiData => (
          <tr key={apiData.Id} 
            data-id={apiData.Id}
            data-name={apiData.Id}
          >
            <td>{apiData.Id}</td>
            <td>{apiData.customerId}</td>
            <td>{apiData.customerName}</td>
            <td>{apiData.customerPhone}</td>
            <td>{apiData.tableId}</td>
            <td>{apiData.reservationDate}</td>
            <td>{apiData.reservationTime}</td>
            <td>
              <span>
                <a href="#" className="info-icon">
                  <i className="bi bi-info-circle me-3"></i>
                </a>
                <a href="#" className="delete-icon">
                  <i className="bi bi-trash"></i>
                </a>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
</div>
<Card>
  <Card.Body>
  <FreeTime dateTime={new Date().toLocaleDateString('en-CA')}/>
  </Card.Body>
</Card>
</>
    )
}

export default CustomerList;