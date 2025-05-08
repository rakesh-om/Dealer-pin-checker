import React, { useState } from 'react';
import styles from '../styles/loginfrom.css'; 

function LoginForm() {
  const [mode, setMode] = useState('login'); 
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!identifier) {
      newErrors.identifier = 'Email or phone number is required.';
    } else if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      newErrors.identifier = 'Invalid email or phone number.';
    }

    if ((mode === 'login' || mode === 'signup') && !password) {
      newErrors.password = 'Password is required.';
    }

    if (mode === 'signup' && !phoneRegex.test(phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number.';
    }

    if (mode === 'reset') {
      if (!otp) newErrors.otp = 'OTP is required.';
      if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
      if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    switch (mode) {
      case 'login':
        console.log('Logging in with:', { identifier, password });
        break;
      case 'forgot':
        console.log('Sending OTP to:', identifier);
        setMode('reset');
        break;
      case 'reset':
        console.log('Resetting password:', { identifier, otp, password });
        break;
      case 'signup':
        console.log('Creating account:', { identifier, phone, password });
        break;
      default:
        break;
    }

    
    setIdentifier('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setOtp('');
    setErrors({});
    setMode('login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>
            {mode === 'login' && 'Dealer Login'}
            {mode === 'forgot' && 'Forgot Password'}
            {mode === 'reset' && 'Reset Password'}
            {mode === 'signup' && 'Create Account'}
          </h2>

          {(mode === 'login' || mode === 'forgot' || mode === 'signup') && (
            <div className="form-group">
              <label>Email or Phone:</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or phone"
              />
              {errors.identifier && <span className="error">{errors.identifier}</span>}
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          )}

          {(mode === 'login' || mode === 'signup') && (
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
          )}

          {mode === 'reset' && (
            <>
              <div className="form-group">
                <label>OTP:</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                {errors.otp && <span className="error">{errors.otp}</span>}
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
            </>
          )}

          <button type="submit" className="login-button">
            {mode === 'login' && 'Login'}
            {mode === 'forgot' && 'Send OTP'}
            {mode === 'reset' && 'Reset Password'}
            {mode === 'signup' && 'Sign Up'}
          </button>

          {mode === 'login' && (
            <div className="form-links">
              <button type="button" onClick={() => setMode('forgot')} className="link-button">
                Forgot Password?
              </button>
              <button type="button" onClick={() => setMode('signup')} className="link-button">
                Create Account
              </button>
            </div>
          )}

          {(mode === 'forgot' || mode === 'reset' || mode === 'signup') && (
            <div className="form-links">
              <button type="button" onClick={() => setMode('login')} className="link-button">
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
  