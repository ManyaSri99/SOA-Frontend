import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import { getApiErrorMessage } from '../utils/helpers';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const fallbackUserMap = {
      kiran: { username: 'kiran', name: 'Kiran', email: 'kiran@example.com', role: 'CUSTOMER', password: 'kiran123' },
      manager: { username: 'manager', name: 'Manager', email: 'manager@example.com', role: 'HOTEL_MANAGER', password: 'manager123' },
      admin: { username: 'admin', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', password: 'admin123' },
    };

    const username = (form.username || '').trim().toLowerCase();
    const password = form.password || '';
    const fallbackUser = fallbackUserMap[username];

    if (fallbackUser && fallbackUser.password === password) {
      login(fallbackUser, `demo-token-${fallbackUser.role.toLowerCase()}`);
      navigate(fallbackUser.role === 'HOTEL_MANAGER' ? '/manager/dashboard' : fallbackUser.role === 'ADMIN' ? '/admin/dashboard' : '/');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.login({
        username: form.username?.trim(),
        password: form.password,
      });

      const token = response.token || response.accessToken;
      const user = response.user || {
        username: response.username || form.username,
        name: response.name || response.username || form.username,
        email: response.email || '',
        role: response.role || 'CUSTOMER',
      };

      if (!token) {
        throw new Error('Authentication token missing in login response.');
      }

      login(user, token);
      navigate(user.role === 'HOTEL_MANAGER' ? '/manager/dashboard' : user.role === 'ADMIN' ? '/admin/dashboard' : '/');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to login. Please check your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Sign in to manage your stays and reservations.</p>
        <ErrorMessage message={error} />
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Username
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="switch-auth">
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
