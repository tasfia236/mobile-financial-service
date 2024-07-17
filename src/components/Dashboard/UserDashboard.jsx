import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import AuthContext from '../../contexts/AuthContext';
import { FaHome, FaMoneyBill } from 'react-icons/fa';

const UserDashboard = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [balance, setBalance] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBalance = async () => {
      const { data } = await api.get('/balance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBalance(data.balance);
    };

    const fetchTransactions = async () => {
      const { data } = await api.get('/transaction-history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(data);
    };

    fetchBalance();
    fetchTransactions();
  }, []);

  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard/profile">
          <FaMoneyBill></FaMoneyBill>
          Send Money</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/mybooking">

          Cash-Out</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/mywishlist">

          Cash-In</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/requestAdmin">

          Balance Inquiry</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/transactions">

          Transactions History</NavLink>
      </li>
    </>

  );

  return (
    <div>
      {/* <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Balance: {balance}</h2>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id} className="mb-2">
                {transaction.type} - {transaction.amount} - {new Date(transaction.date).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Logout</button>
      </div> */}
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-blue-400">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-2xl font-bold">User DashBoard</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {userLinks}
                <div className="divider"></div>
                <li>
                  <NavLink to="/">
                    <FaHome /> Home
                  </NavLink>
                </li>
                <li>
                  <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Logout</button>
                </li>
              </ul>
            </div>

          </div>
          {/* Dashboard content */}
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {userLinks}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
