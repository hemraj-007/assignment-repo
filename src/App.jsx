import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexCharts from 'react-apexcharts';
import './App.css';

function App() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://checkinn.co/api/v1/int/requests")
      .then(response => {
        const data = response.data.requests;
        
        const counts = data.reduce((acc, val) => {
          const hotelName = val.hotel.name;
          acc[hotelName] = (acc[hotelName] || 0) + 1;
          return acc;
        }, {});

        
        setSeries([{
          name: "Requests",
          data: Object.values(counts)
        }]);
        setCategories(Object.keys(counts));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert('Error fetching data');
      });
  }, []);

  return (
    <div className='bg-slate-500 min-h-screen flex flex-col items-center justify-center'>
      <div className='text-center text-white text-2xl font-extrabold mb-6'>Vesta & Atom Assignment</div>
      <div className="w-full max-w-lg p-6 rounded-lg bg-white">
        <ReactApexCharts 
          type="line" 
          series={series} 
          options={{
            chart: {
              id: 'requests-per-hotel',
              type: 'line',
              height: 350
            },
            xaxis: {
              categories: categories
            }
          }} 
          height={350}
        />
      </div>
    </div>
  )
}

export default App;