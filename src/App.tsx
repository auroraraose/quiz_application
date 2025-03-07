import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/HomePage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute element={<DashboardPage />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
        <Route path="/test/:testId" element={<PrivateRoute element={<TestPage />} />} />
        <Route path="/results" element={<PrivateRoute element={<ResultPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;
