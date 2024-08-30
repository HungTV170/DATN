// LargeModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LargeModal = ({ title, mes, show, handleClose ,confirmButton = false, onConfirm= null}) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mes}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        {confirmButton ? "HỦY BỎ" : "ĐÓNG"}
        </Button>
          {confirmButton && (
            <Button 
              variant="primary" 
              onClick={() => {
                if (onConfirm) onConfirm(); 
              handleClose(); 
              }}
            >
              XÁC NHẬN
            </Button>
          )}

      </Modal.Footer>
    </Modal>
  );
};

export default LargeModal;
