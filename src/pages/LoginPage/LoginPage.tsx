import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { AppDispatch } from '../../store/store';

// ============================================================
// TYPES
// ============================================================

// Type for data in form (if I'd like to widen)
interface LoginFormData {
  username: string;
  password: string;
}

// ============================================================
// COMPONENT
// ============================================================

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      dispatch(login({ username }));
      navigate('/');
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i> FIND JAMMATES
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
