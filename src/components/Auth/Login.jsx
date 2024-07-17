import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import AuthContext from '../../contexts/AuthContext';

const Login = () => {
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [pin, setPin] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/login', { emailOrMobile, pin });
            login(data.token); // Assuming `login` stores the token and updates the user context
            navigate('/'); // Redirect to the user dashboard after login
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (e.g., show error message to the user)
        }
    };

    return (
        <div className=''>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="emailOrMobile" className="block text-sm font-medium text-gray-700">Email or Mobile</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="emailOrMobile"
                                value={emailOrMobile}
                                onChange={(e) => setEmailOrMobile(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN</label>
                            <input
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="pin"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Login</button>
                        <button onClick={() => navigate('/register')} className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
