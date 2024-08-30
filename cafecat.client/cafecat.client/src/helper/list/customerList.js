import Modal from '../../components/public-component/modal';
import IForm from '../../components/public-component/form';
import './../../assets/css/customerStyle.css';
const customerList = ({ 
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
    <h5 className="card-title"> DANH SÁCH KHÁCH HÀNG</h5>
    <div className="row">
      <div className="col-lg-9">
        <p>Nhấn vào từng khách hàng để hiển thị chi tiết</p>
      </div>
      <div className="col-lg-3 mb-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Thêm Khách Hàng
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
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody  >
        {apiDatas.map(apiData => (
          <tr key={apiData.Id} 
            data-id={apiData.Id}
            data-name={`${apiData.firstName} ${apiData.lastName}`}
          >
            <td>{apiData.Id}</td>
            <td>{apiData.firstName} {apiData.lastName}</td>
            <td>{apiData.phoneNumber}</td>
            <td>{apiData.email}</td>
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
</>
    )
}

export default customerList;