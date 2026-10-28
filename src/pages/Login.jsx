import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import './Login.css';

export default function Login() {
  const { isAdmin, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdmin) {
    return <Navigate to="/metrics" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(username, password);
      navigate(location.state?.from?.pathname || '/metrics', { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : String(loginError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="login-eyebrow">Admin access</p>
        <h1>Sign in</h1>
        <p className="login-description">Sign in with an admin account to view middleware metrics.</p>

        <label htmlFor="admin-username">Username</label>
        <input
          id="admin-username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="login-error" role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
