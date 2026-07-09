import React, { useState } from 'react';
import { PRESET_CREDENTIALS } from '../mockData';

export default function LoginView({ onLogin }) {
  const [role, setRole] = useState('admin'); // 'admin' or 'employee'
  const [email, setEmail] = useState(PRESET_CREDENTIALS.admin.email);
  const [password, setPassword] = useState(PRESET_CREDENTIALS.admin.password);
  const [error, setError] = useState('');

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setEmail(PRESET_CREDENTIALS[selectedRole].email);
    setPassword(PRESET_CREDENTIALS[selectedRole].password);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const preset = PRESET_CREDENTIALS[role];
    if (email.toLowerCase() === preset.email.toLowerCase() && password === preset.password) {
      setError('');
      onLogin({
        id: preset.id || null,
        name: preset.name,
        email: preset.email,
        avatar: preset.avatar,
        roleName: preset.role
      }, role);
    } else {
      setError('Invalid credentials for selected role.');
    }
  };

  const handleQuickFill = () => {
    setEmail(PRESET_CREDENTIALS[role].email);
    setPassword(PRESET_CREDENTIALS[role].password);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="glow-node node-1"></div>
      <div className="glow-node node-2"></div>
      
      <div className="login-card glass">
        <div className="login-branding">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="eyebrow glow-text">Portal Login</span>
          <h1>AuraHR</h1>
          <p className="subtitle">
            Next-gen employee workspace with live scheduling, automated salary generation, and interactive HR assistance.
          </p>
          <ul className="brand-benefits">
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              <span>Instant Leave Processing</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              <span>Live Shift Synchronization</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              <span>Built-in HR Chatbot Support</span>
            </li>
          </ul>
        </div>

        <div className="login-form-area">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Access your department portal</p>
          </div>

          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Administrator</span>
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'employee' ? 'active' : ''}`}
              onClick={() => handleRoleChange('employee')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Employee</span>
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Corporate Email</label>
              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="input-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="input-icon">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="login-error">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="login-submit-btn">
              <span>Sign In as {role === 'admin' ? 'Admin' : 'Employee'}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <div className="preset-hint">
              <span>Testing credentials auto-filled. Reset if modified:</span>
              <button type="button" className="btn-link" onClick={handleQuickFill}>
                Reload default {role} info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
