// src/hooks/useLogin.js
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const useLoginService = () => {

    const navigate = useNavigate();
  const [formData,setFormData] = React.useState({
    email:'',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};


  const handleSubmit = async (e, history) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

    if (response.status === 202) {
        localStorage.setItem('jwt', data.token);
        alert('Login successful!');
        navigate(process.env.REACT_APP_PATH_HOME)
    } else if(response.status === 401){
      alert('Wrong Username or Password');
    }

    else{
        let errorMessage = 'An error occurred.';

        if (data.errors) {
          errorMessage = Object.keys(data.errors)
            .map(key => `${key}: ${data.errors[key].join(', ')}`)
            .join('\n');
        } else {
            errorMessage = Object.keys(data)
            .map(key => `${key}: ${data[key].join(', ')}`)
            .join('\n');
        }

        alert(`Phản hồi từ server:\n${errorMessage}`);
    }   

      
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');

    }
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};

