import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import AuthContext from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(data);
    };

    const fetchTransactions = async () => {
      const { data } = await api.get('/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(data);
    };

    fetchUsers();
    fetchTransactions();
  }, []);

  const handleApprove = async (id) => {
    await api.put(`/users/approve/${id}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setUsers(users.map(user => user._id === id ? { ...user, status: 'approved' } : user));
  };

  const handleBlock = async (id) => {
    await api.put(`/users/block/${id}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setUsers(users.map(user => user._id === id ? { ...user, status: 'blocked' } : user));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              {user.name} - {user.email} - {user.status} 
              {user.status === 'pending' && (
                <>
                  <button onClick={() => handleApprove(user._id)} className="ml-4 px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">Approve</button>
                  <button onClick={() => handleBlock(user._id)} className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">Block</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className="mb-2">
              {transaction.type} - {transaction.amount} - {new Date(transaction.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Logout</button>
    </div>
  );
};

export default AdminDashboard;
