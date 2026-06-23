import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice'; // создадим позже

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Пока просто заглушка: если username и password не пустые — логиним
    if (username && password) {
      dispatch(login({ username }));
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="glitch" data-text="LOGIN">LOGIN</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i> FIND JAMMATES
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
