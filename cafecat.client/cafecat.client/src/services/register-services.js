import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const useRegisterService = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName:'',
        phoneNumber:'',
        email: '',
        password: '',
        employeeId: '',
        roles:['User']
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT_REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.text();

            if(data){
                var validate = JSON.parse(data);
            }
            if (response.status === 202) {
                alert('Registration successful!');
                navigate(process.env.REACT_APP_PATH_LOGIN)
            }else{
                let errorMessage = 'An error occurred.';

                if (validate.errors) {
                  errorMessage = Object.keys(validate.errors)
                    .map(key => `${key}: ${validate.errors[key].join(', ')}`)
                    .join('\n');
                } else {
                    errorMessage = Object.keys(validate)
                    .map(key => `${key}: ${validate[key].join(', ')}`)
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
