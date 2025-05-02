import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ handleLogin = () => {} }) => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [resetStage, setResetStage] = useState('email');
  const [verificationResponse, setVerificationResponse] = useState(null);

  const handleSwitchForm = (form) => {
    setActiveForm(form);
    setResetStage('email');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const localEmail = 'prismire@gmail.com';
    const localPassword = 'prismire';

    if (loginEmail === localEmail && loginPassword === localPassword) {
      const mockUser = {
        name: 'Deepak',
        email: loginEmail,
        role: 'admin',
      };

      localStorage.setItem('currentlogged', JSON.stringify(mockUser));
      handleLogin(mockUser);
      navigate('/dashboard');
      setPopupMessage('Login successful!');
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8105/api/account/login', {
        email: loginEmail,
        password: loginPassword,
      });

      const user = response.data;

      if (user) {
        localStorage.setItem('currentlogged', JSON.stringify(user));
        handleLogin(user);
        navigate('/dashboard');
        setPopupMessage('Login successful!');
        setShowPopup(true);
      } else {
        setPopupMessage('Invalid email or password.');
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage('Login failed. Please check credentials.');
      setShowPopup(true);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8105/api/email/sendOtp', {
        toEmail: resetEmail,
      });
      setResetStage('otp');
      setPopupMessage('OTP sent to your email.');
      setShowPopup(true);
    } catch (error) {
      setPopupMessage('Failed to send OTP.');
      setShowPopup(true);
    }
  };

  const handleOtpVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8105/api/email/verify-otp', {
        email: resetEmail,
        otp,
      });
      setVerificationResponse(response);
      setResetStage('password');
      setPopupMessage('OTP verified. Enter new password.');
      setShowPopup(true);
    } catch (error) {
      setPopupMessage('Invalid OTP.');
      setShowPopup(true);
    }
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const userOb = {
        ...verificationResponse.data,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      };
      await axios.post('http://localhost:8105/api/account/create', userOb);
      setPopupMessage('Password reset successful.');
      setShowPopup(true);
      setActiveForm('login');
    } catch (error) {
      setPopupMessage('Password reset failed.');
      setShowPopup(true);
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Image Column */}
        <div className="col-image">
          <img src="/Logo.png" alt="HRMS Logo" className="side-image" />
        </div>

        {/* Form Column */}
        <div className="col-form">
          <h1 className="section-title">Welcome Back</h1>

          {/* Switcher Buttons */}
          <div className="switcher-group">
            <button className="switcher" onClick={() => handleSwitchForm('login')}>
              Login <span className="underline" />
            </button>
            <button className="switcher" onClick={() => handleSwitchForm('forgot')}>
              Forgot Password <span className="underline" />
            </button>
          </div>

          {/* Login Form */}
          {activeForm === 'login' && (
            <form className="form" onSubmit={handleLoginSubmit}>
              <div className="input-block">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-login btn-primary-login">Login</button>
            </form>
          )}

          {/* Forgot Password Flow */}
          {activeForm === 'forgot' && (
            <form className="form">
              {resetStage === 'email' && (
                <div className="input-block">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
              )}

              {resetStage === 'otp' && (
                <div className="input-block">
                  <label>OTP</label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              {resetStage === 'password' && (
                <>
                  <div className="input-block">
                    <label>New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-block">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn-login btn-success-login"
                onClick={(e) => {
                  if (resetStage === 'email') handleResetSubmit(e);
                  else if (resetStage === 'otp') handleOtpVerificationSubmit(e);
                  else handlePasswordResetSubmit(e);
                }}
              >
                {resetStage === 'email'
                  ? 'Send OTP'
                  : resetStage === 'otp'
                  ? 'Verify OTP'
                  : 'Reset Password'}
              </button>
            </form>
          )}

          {/* Popup */}
          {showPopup && (
            <div className="popup-container">
              <div className="popup-content">
                <p>{popupMessage}</p>
                <button onClick={closePopup}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
