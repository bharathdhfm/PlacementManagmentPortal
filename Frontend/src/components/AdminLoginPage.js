import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loginAdmin = () => {
    axios.post('http://localhost:2001/admin/login', null, {
        params: { username, password },
    })
    .then((response) => {
        const { success, message, adminName } = response.data;
        if (success) {
            // Store admin name, username, and success flag in localStorage
            localStorage.setItem('isAdmin', true);
            localStorage.setItem('adminName', adminName); // Store admin name
            localStorage.setItem('username', username);   // Store username
            setMessage(message);
            navigate('/admin-home');
        } else {
            setMessage(message); // Display backend error message
        }
    })
    .catch((error) => {
        setMessage('An error occurred. Please try again.');
        console.error('Login error:', error);
    });
};

  return (
    <div>
      <h3>Admin Login</h3>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={loginAdmin}>Login</button>
      <h3>{message}</h3>
    </div>
  );
}
