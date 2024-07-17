import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import AgentDashboard from './components/Dashboard/AgentDashboard';
import AuthContext from './contexts/AuthContext';

const App = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 mx-auto max-w-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
