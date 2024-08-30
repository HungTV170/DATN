import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const borderColorMap = {
  '0': 'blue',
  '1': 'green'
};
const bgColorMap = {
  '0': 'rgba(54, 162, 235, 0.5)',
  '1': 'rgba(75, 192, 192, 0.5)'
};

const RevenueChart = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    fetch(process.env.REACT_APP_DASHBOARD_GETCHART,{
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
        if (apiData.datasets && Array.isArray(apiData.datasets)) {
          const updatedDatasets = apiData.datasets.map((item, index) => ({
            ...item,
            borderColor: borderColorMap[index],
            backgroundColor: bgColorMap[index],
            fill: true,
          }));

          setData({ ...apiData, datasets: updatedDatasets });
        } else {
          setData(apiData);
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue, and Order Today',
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Inline styles for full width and height
  const chartContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  const chartStyle = {
    width: '100% !important',
  };

  return (
    <div style={chartContainerStyle}>
      <Line data={data} options={options} style={chartStyle} />
    </div>
  );
};

export default RevenueChart;
