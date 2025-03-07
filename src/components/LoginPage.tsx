import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../redux/authSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      dispatch(loginSuccess(response.data.token));

      navigate('/home');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.');
      dispatch(loginFailure('Invalid credentials. Please try again.'));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
