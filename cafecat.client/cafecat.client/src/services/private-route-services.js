import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('jwt'); 

  return isAuthenticated ? <Element /> : 
    <>
    {alert("Login to access this")}
    <Navigate to="/pages-login" />
    </>;
};

export default PrivateRoute;
