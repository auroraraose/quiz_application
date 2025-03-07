import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../redux/authSlice';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Dispatch loginRequest to set loading state
    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:8080/register', {
        email,
        password,
      });

      // Assuming the backend returns a token after successful registration
      console.log('Registration successful:', response.data);

      // Automatically log the user in after successful registration
      dispatch(loginSuccess(response.data.token));

      // Redirect to home page on success
      navigate('/home');
    } catch (err: any) {
      console.error('Error registering:', err);
      setError('Registration failed. Please try again.');
      dispatch(loginFailure('Registration failed. Please try again.'));
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
