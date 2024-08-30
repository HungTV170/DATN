import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './alert.css'; 

const MyAlert = ({ mes, type }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
        const fadeTimer = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
  
        return () => clearTimeout(fadeTimer);
      }, 1500);
  
      return () => clearTimeout(timer);
    }, []);
  
    const handleClose = () => {
      setIsVisible(false);
    };
  
    if (!isVisible) return null;
  
    let alertClass = '';
    let iconClass = '' ;
    switch (type) {
      case '1': alertClass += 'success'; iconClass +='bi-check-circle' ;break; 
      case '2': alertClass += 'danger';  iconClass +='bi-exclamation-octagon' ;break;
      case '3': alertClass += 'warning';  iconClass +='bi-exclamation-triangle' ;break;
      case '4': alertClass += 'info';  iconClass +='bi-info-circle' ;break;
      default: alertClass += 'primary'; iconClass +='bi-star';
    }
    return (
      <Alert 
        variant={alertClass }
        className={fadeOut ? 'fade-out' : ''} 
        dismissible
        onClose={handleClose}
      >
          <i className={`${iconClass} bi me-1`}></i>
          {mes}
      </Alert>
    );
  
  };

export default MyAlert;
  




