
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    if (event) {
        event.preventDefault(); 
      }
    localStorage.removeItem('jwt');
    localStorage.removeItem('userData');
    navigate(process.env.REACT_APP_PATH_LOGIN); 
  };

  return {
    logout,
  };
};


