import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ORIGINAL credentials are intentionally left unchanged
    if (username === 'admin' && password === '1234') {
      alert('Login successful');
      navigate('/nurse-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess(false);

    if (!newPassword || !confirmPassword) {
      setResetError('Please fill both fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    // NOTE: We are NOT changing the real credentials here.
    // This is a simple UI confirmation flow that validates the new password + confirm.
    setResetSuccess(true);
    setNewPassword('');
    setConfirmPassword('');

    // Give a gentle note to the user.
    alert('New password set (UI-only demo). The app still uses admin / 1234 for login.');
    setShowReset(false);
  };

  return (
    <div className="login-bg">
      <div className="login-form">
        <h2>SSPD EMR</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <button
            type="button"
            className="forgot-link"
            onClick={() => {
              setShowReset((s) => !s);
              setResetError('');
              setResetSuccess(false);
            }}
          >
            Forgot password?
          </button>
        </form>

        {showReset && (
          <form className="reset-panel" onSubmit={handleResetSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            {resetError && <div className="error">{resetError}</div>}
            {resetSuccess && <div className="reset-success">Password set successfully.</div>}

            <button type="submit" className="reset-btn">Set Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;