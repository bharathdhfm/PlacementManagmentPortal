import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';
import { FaSpinner } from 'react-icons/fa';
import Image1 from './Images/c1.png';

export function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const loginStudent = async () => {
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address (e.g., example@gmail.com)');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:2003/student/login', null, {
        params: { email, password },
      });

      const { success, message, studentId } = response.data;
      if (success) {
        setMessage(message);
        localStorage.setItem('studentId', studentId); // Save studentId
        localStorage.setItem('email', email); // Save email in localStorage
        navigate('/student-home');
      } else {
        setMessage(message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Student Login</h2>
        <p className="login-message">{message}</p>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={loginStudent} disabled={loading} className="login-button">
          {loading ? <FaSpinner className="spinner" /> : 'Login'}
        </button>
        <p className="signup-text">
          Don't have an account? <a href="/student-register">Sign up</a>
        </p>
      </div>
      <div className="welcome-section">
        <h2>Welcome to</h2>
        <h1>Student Portal</h1>
        <p>Login to access your account</p>
        <div className="illustration">
          <img src={Image1} alt="Welcome Illustration" />
        </div>
      </div>
    </div>
  );
}
