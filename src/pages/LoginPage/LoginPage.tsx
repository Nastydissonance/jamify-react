import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { login } from '../../store/authSlice';

// ============================================================
// TYPES
// ============================================================

// Нет пропсов — компонент использует хуки напрямую

// ============================================================
// COMPONENT
// ============================================================

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) return;

    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // ============================================================
  // RENDER
  // ============================================================

  // Если уже авторизован — редиректим
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="glitch" data-text="LOGIN">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
          />
          {error && <div className="error-message">❌ {error}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            <i className="fas fa-sign-in-alt"></i>
            {loading ? 'LOADING...' : 'FIND JAMMATES'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
