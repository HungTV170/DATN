import React from 'react';
import { useEffect, useState } from 'react';

const Items = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    fetch(process.env.REACT_APP_DASHBOARD_GETITEMS,{
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
      },
  })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiData => {
        setData(apiData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
  <>
<div className="d-flex align-items-center">
  <div className="rounded-circle p-3 me-3"  style={{ backgroundColor: 'rgb(139, 139, 255)' }}>
    <i className="bi bi-cup-straw" style={{ fontSize: '2rem' }}></i>
  </div>
  <div>
    <h4 className="mb-0 text-primary">{data} Món Ăn</h4>
  </div>
</div>
  </>)
};

export default Items;
