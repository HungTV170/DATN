
import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/public-component/alert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (mes, type) => {
    const newAlert = { id: Date.now(), mes, type };
    setAlerts((prevAlerts) => {
        const updatedAlerts = prevAlerts.length >= 3 ? prevAlerts.slice(1) : prevAlerts;
        return [...updatedAlerts, newAlert];
      });

  };

  return (
    <AlertContext.Provider value={addAlert}>
      <div id="alert-container"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1050,
        overflowY: 'auto',
      }}
      >
        {alerts.map((alert) => (
          <Alert key={alert.id} mes={alert.mes} type={alert.type} />
        ))}
      </div>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
