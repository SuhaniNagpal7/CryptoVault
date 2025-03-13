import React from 'react';
import { Welcome, Services } from '../components';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Welcome />
      <Services />
    </div>
  );
};

export default Dashboard; 