import React, { useEffect, useState } from 'react';
import { DataTable } from 'simple-datatables';
import 'simple-datatables/dist/style.css';
import { useApiServices } from '../../services/Api-services';
import Loading from '../../components/public-component/loading';
import Error from '../../components/public-component/error';
import { useNavigate } from 'react-router-dom';

const List = ({ options ,renderChild}) => {
  const { GetAll, DeleteById,Create, apiDatas, error, loading } = useApiServices(options.url, options.transformCustomerData);
  const [dataTable, setDataTable] = useState(null);
  const navigate = useNavigate();

  // setup for Modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [confirmButton, setConfirmButton] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = (id, name) => {
    setModalTitle(options.ModalOpt.title);
    setModalMessage(`${options.ModalOpt.mes} ${name} không?`);
    setConfirmButton(options.ModalOpt.confirmButton);
    setOnConfirm(() => () => {
      DeleteById(id);
      handleCloseModal();
    });
    handleShowModal();
  };

  useEffect(() => {
    GetAll();
  }, []);

  useEffect(() => {
    const myTable = document.querySelector("#myTable");
    if (myTable && apiDatas.length > 0) {
      const dt = new DataTable(myTable, options.DataTableOpt);
      setDataTable(dt);
    }
    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [apiDatas]);

  const handleTableClick = (event) => {
    const target = event.target;
    const trashIcon = target.closest('.delete-icon');
    if (trashIcon) {
      const row = trashIcon.closest('tr');
      if (row) {
        const id = row.getAttribute('data-id');
        const name = row.getAttribute('data-name');
        handleDelete(id, name);
      }
    }
    const infoIcon = target.closest('.info-icon');
    if (infoIcon) {
      const row = infoIcon.closest('tr');
      if (row) {
        const id = row.getAttribute('data-id');
        navigate(`${options.component}/${id}`);
      }
    }
  };

  const data = {
    handleTableClick: handleTableClick,
    apiDatas: apiDatas,
    modalTitle: modalTitle,
    showModal: showModal,
    modalMessage: modalMessage,
    confirmButton: confirmButton,
    onConfirm: onConfirm,
    handleCloseModal:   handleCloseModal,
    formOptions: options.formOpt,
    Create:Create,
    handleApiDataChange:(data)=>{},
  };

  if (error) {
    return <Error/>
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {renderChild && renderChild(data)}
    </>
  );
};

export default List;
