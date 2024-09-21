import { useState } from "react";


export const useApiServices = (baseUrl ,transformData ) => {
  const [apiDatas, setApiDatas] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('jwt');

  const resolveError = (errorData)=>{
    console.log(errorData);
    if (errorData && errorData.errors) {
      const errorMessages = Object.keys(errorData.errors).map(field => {
        return `${field}: ${errorData.errors[field].join(', ')}`;
      }).join('\n');
      return `Validation Errors:\n${errorMessages}`;
    }
    return errorData.message || 'Bad Request: Please check your input and try again.';
  }
  const GetAll = () => {
    setLoading(true);
    fetch(`${baseUrl}`,{
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
      },
  })
      .then(response => {
        if(response.status === 401){
          throw new Error(`You need to log in to access this resource ...`)
        }
        if(response.status === 403){
          throw new Error(`you don't have enough permissions to access this resource ...`)
        }
        if (response.status === 400) {
          return response.json().then(errorData => {
            const errorMessage = resolveError(errorData);
            alert(errorMessage);
          });  
        }
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setApiDatas(transformData(data));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        alert(`An error occurred :${err.message}. Please try again later.`);
        setLoading(false);
      });
  }

  const GetById = (id) => {
    setLoading(true);
    fetch(`${baseUrl}/${id}`,{
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
      },
  })
      .then(response => {
        if(response.status === 401){
          throw new Error(`You need to log in to access this resource ...`)
        }
        if(response.status === 403){
          throw new Error(`you don't have enough permissions to access this resource ...`)
        }
        if (response.status === 400) {
          return response.json().then(errorData => {
            const errorMessage = resolveError(errorData);
            alert(errorMessage);
          }); 
        }
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if(data){
          setApiData(transformData(data));
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        alert(`An error occurred :${err.message}. Please try again later.`);
        setLoading(false);
      });
  }


  const Create = (newApiData, isFile) => {
    setLoading(true);
  
    let headers = {'Authorization': `Bearer ${token}`};
    let body;
  
    if (isFile) {
      body = newApiData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(newApiData);
    }
  
    fetch(`${baseUrl}`, {
      method: 'POST',
      headers: headers,
      body: body
    })
    .then(response => {
      if(response.status === 401){
        throw new Error(`You need to log in to access this resource ...`)
      }
      if(response.status === 403){
        throw new Error(`you don't have enough permissions to access this resource ...`)
      }
      if (response.status === 400) { 
        //alert('Bad Request: Please check your input and try again.');
        //window.location.reload();
        return response.json().then(errorData => {
          const errorMessage = resolveError(errorData);
          alert(errorMessage);
        }); 
      }
      if (response.status === 201) {
        alert("Tạo thành công");
        return response.json();
      } else {
        return response.text().then(text => {
          try {
            const error = JSON.parse(text);
            throw new Error(error.message || "An error occurred");
          } catch (e) {
            throw new Error(text || "An error occurred, but no details are available");
          }
        });
      }
      
    })
    .then(data => {
      if(data){
        setApiDatas(prev => {        
          if (Array.isArray(prev)) {
            return [...prev, transformData(data)];
          } else {
            return [transformData(data)];
          }
        });
      }
      setLoading(false);   
    })
    .catch(err => {
      console.error('Error:', err);
      setError(err.message);
      alert(`${err.message}`);
      setLoading(false);
    });
  };
  

  const UpdateById = (id, updatedApiData, isFile) => {
    setLoading(true);

    let options = {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${token}`}
    };

 
    if (isFile) {
        options.body = updatedApiData; 
    } else {
        options.headers['Content-Type'] = 'application/json'; 
        options.body = JSON.stringify(updatedApiData); 
    }

    return fetch(`${baseUrl}/${id}`, options)
        .then(response => {
          if(response.status === 401){
            throw new Error(`You need to log in to access this resource ...`)
          }
          if(response.status === 403){
            throw new Error(`you don't have enough permissions to access this resource ...`)
          }
          if (response.status === 400) {
            return response.json().then(errorData => {
              const errorMessage = resolveError(errorData);
              alert(errorMessage);
            }); 
          }
            if (response.ok) {
                alert("Cập nhật thành công");
                // setApiDatas(prevApiDatas =>
                //     prevApiDatas.map(apiData =>
                //         apiData.Id === Number(id) ? { ...apiData, ...updatedApiData } : apiData
                //     ) 
                // );   
                return response.json().catch(() => {
                  return null; })
            } else {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
        }).then(data =>{
          if(data)
            return transformData(data);
          return null;
        })
        .catch(err => {
            console.error('Error:', err);
            setError(err.message);
            alert(`An error occurred :${err.message}. Please try again later.`);
        })
        .finally(() => {
            setLoading(false); 
        });

};


  const DeleteById = (id) => {
    setLoading(true);
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
    },
    })
    .then(response => {
      if(response.status === 401){
        throw new Error(`You need to log in to access this resource ...`)
      }
      if(response.status === 403){
        throw new Error(`you don't have enough permissions to access this resource ...`)
      }
      if (response.status === 400) {
        return response.json().then(errorData => {
          const errorMessage = resolveError(errorData);
          alert(errorMessage);
        }); 
      }
      if (response.status == 204) {
        alert("Xóa thành công");
        setApiDatas(prev => {
          const Id = Number(id);
          const updatedDatas = prev.filter(c => c.Id !== Id);
          return updatedDatas;
        }
      

        );
        setLoading(false);

      }else{
        throw new Error('Network response was not ok: ' + response.statusText);
      }

    })
    .catch(err => {
      console.error('Error:', err);
      setError(err.message);
      alert(`An error occurred :${err.message}. Please try again later.`);
      setLoading(false);
    });
  }


  return {
    GetAll,
    GetById,
    Create,
    UpdateById,
    DeleteById,
    apiDatas,
    apiData,
    error,
    loading
  }
};
