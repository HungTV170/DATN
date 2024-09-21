import Modal from '../../components/public-component/modal';
import IForm from '../../components/public-component/form';
import './../../assets/css/customerStyle.css';
import React, { useState ,useEffect} from 'react';
import Filter from './orderList/FilterOrder';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import useFilter from './orderList/useFilter';


const OrderList = ({ 
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
  const [ListFilter,setFilter] = useState({
    CUSTOMER: '',
    PHONE: '',
    TABLE: '',
    EMPLOYEE: '',
    STATUS: '',
    TIME: 'Hôm nay',
  });
  let BGMap={
    "0":"primary",
    "1":"secondary",
    "2":"success",
    "3":"danger",
    "4":"warning",
    "5":"info"
  };
  let employee = localStorage.getItem('userData');
  employee = JSON.parse(employee);
  const newApiData ={
    ...apiDatas,
    employeeId:employee.employeeId
  }

  const { applyFilters } = useFilter(ListFilter );
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
    <h5 className="card-title"> 
      DANH SÁCH ĐƠN HÀNG 
    </h5>
    <div className="row">
      <div className="col-lg-9">
        <Stack direction="horizontal" gap={2} className="mb-3">
          {
            Object.entries(ListFilter).map(([key, value], index) => (
              value === '' ? null : (
                <Badge key={key} bg={BGMap[index] ?? 'dark'}>
                  {key}: {value}
                </Badge>
              )
            ))
          }
        </Stack>

    <Filter getFilter={setFilter}/>

    <p>Nhấn vào từng đơn hàng để hiển thị chi tiết</p>

      </div>
      <div className="col-lg-3 mb-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Thêm Đơn Hàng
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
              apiData={newApiData} 
              onApiDataChange={handleApiDataChange}
            />
          </div>
        </div>
      </div>
    </div>
    <div className='overflowX' onClick={handleTableClick}>
    <table id="myTable1" className="table datatable ">
      <thead>
        <tr>
          <th>ID</th>
          <th>CUSTOMER</th>
          <th>PHONE NUMBER</th>
          <th>TABLE</th>
          <th>EMPLOYEE</th>
          <th>STATUS</th>
          <th></th>
        </tr>
      </thead>
      <tbody  >{console.log(apiDatas)}
        {applyFilters(apiDatas).map(apiData => (
          <tr key={apiData.Id} 
            data-id={apiData.Id}
            data-name={`${apiData.Id}`}
           >
            <td>{apiData.Id}</td>
            <td>{apiData.customer}</td>
            <td>{apiData.sdt}</td>
            <td>{apiData.table}</td>
            <td>{apiData.employee}</td>
            <td>{apiData.status}</td>
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

export default OrderList;