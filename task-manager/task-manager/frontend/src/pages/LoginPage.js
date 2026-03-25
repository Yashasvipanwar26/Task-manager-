import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';

function LoginPage() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submit
  async function handleLogin(e) {
    e.preventDefault(); // stop page from refreshing
    setError('');
    setLoading(true);

    try {
      // Send login request to backend
      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password
      });

      // Save token and user info to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Go to tasks page
      navigate('/tasks');

    } catch (err) {
      // Show error message from server
      setError(err.response?.data?.message || 'Login failed');
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">Login to your account</p>

        {/* Show error if any */}
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function(e) { setEmail(e.target.value); }}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={function(e) { setPassword(e.target.value); }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
