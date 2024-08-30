import { main } from '../../assets/js/main';
import React, { useEffect, useState } from 'react';
import Header from './public/header';
import Aside from './public/aside';
import Main from './public/main';
import Footer from './public/footer';
import AlertProvider from '../../services/AlertContext';
import {useNavigate } from 'react-router-dom';
const PagesAdminHome = () => {
  const navigate = useNavigate ();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    main(); 
  }, [userData]); 

  useEffect(() => {
    if (!token) {
      setError("Token not found. Please log in.");
      setLoading(false); 
      return;
    }

    fetch(process.env.REACT_APP_ACCOUNT_INFO, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if(response.status === 401){
          alert("please login again");
          navigate(process.env.REACT_APP_PATH_LOGIN)
        }
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        return response.json();
      })
      .then(apiData => {
        localStorage.setItem('userData', JSON.stringify(apiData));
        setUserData(apiData); 
        setLoading(false); 
      })
      .catch(error => {
        setError(error.message || "An unknown error occurred.");
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {error ? <div>{error}</div> :
      <AlertProvider>
        <Header data={userData} /> 
        <Aside />
        <Main />
        <Footer />
      </AlertProvider>
      }
    </>
  );
}

export default PagesAdminHome;
