import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Dashvalue from './dashvalues';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:4000/dashboard/dashboardgraphic');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height:'100%', width:'100%' }}>
      <LineChart width={1000} height={520} data={dashboardData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="stagiaires" stroke="#8884d8" />
        <Line type="monotone" dataKey="demandes" stroke="#82ca9d" />
      </LineChart>
      <div style={{ width: '45%' }}>
        <Dashvalue />
      </div>
    </div>
  );
};

export default Dashboard;