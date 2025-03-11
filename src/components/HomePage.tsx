import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/authSlice';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Function to Start test on click
  const handleStartTest = () => {
    navigate('/test'); 
  };

  // Function to handle Logout button click
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Quiz Dashboard</h1>
      
      <div className="buttons-container">
        {/* Start Test Button */}
        <button onClick={handleStartTest} className="start-button">
          Start Test
        </button>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
