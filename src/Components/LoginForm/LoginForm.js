import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
 
const defaultHRs = [
  { email: 'HR-HDC@prismire.in', password: 'hr123' },
  { email: 'teja@prismire.in', password: 'hr123' },
  { email: 'HR-PDC@prismire.in', password: 'hr123' },
];
 
if (!localStorage.getItem('hrUsers')) {
  localStorage.setItem('hrUsers', JSON.stringify(defaultHRs));
}
 
function LoginPage() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  const [loginStatusMessage, setLoginStatusMessage] = useState('');
  const [otpStatusMessage, setOtpStatusMessage] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
 
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    gender: '',
    pan: '',
    password: '',
    confirmPassword: ''
  });
 
  const [signUpErrors, setSignUpErrors] = useState({});
 
  const allowedDomains = ['@prismire.in'];
 
  const isValidEmail = (email) =>
    allowedDomains.some((domain) => email.toLowerCase().endsWith(domain));
 
  const autoClearStatus = (setterFn) => {
    setTimeout(() => setterFn(''), 3000);
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid Email');
      setLoginStatusMessage('Login failed: Invalid email domain');
      autoClearStatus(setLoginStatusMessage);
      return;
    }
 
    setEmailError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
 
      setLoginStatusMessage(response.data);
 
      const hrUsers = JSON.parse(localStorage.getItem('hrUsers')) || [];
      const isHR = hrUsers.some(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
      );
 
      localStorage.setItem('loggedInUser', JSON.stringify({ email }));
 
      if (isHR) {
        navigate('/hr-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    } catch (error) {
      setLoginStatusMessage('Login failed ❌');
    }
 
    autoClearStatus(setLoginStatusMessage);
  };
 
  const handleSendOtp = async () => {
    if (!isValidEmail(resetEmail)) {
      setResetEmailError('Please enter a valid Email');
      setOtpStatusMessage('Failed to send OTP ❌');
      autoClearStatus(setOtpStatusMessage);
      return;
    }
 
    setResetEmailError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/send-otp', {
        email: resetEmail,
      });
      setOtpStatusMessage(response.data);
    } catch (error) {
      setOtpStatusMessage('Failed to send OTP ❌');
    }
    autoClearStatus(setOtpStatusMessage);
  };
 
  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    setSignUpErrors({ ...signUpErrors, [e.target.name]: '' });
  };
 
  const validateSignUp = () => {
    const errors = {};
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(signUpData.pan)) {
      errors.pan = 'Invalid PAN format. Should be ABCDE1234F';
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!isValidEmail(signUpData.email)) {
      errors.email = 'Invalid email domain';
    }
    return errors;
  };
 
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignUp();
    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }
 
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', signUpData);
      alert(response.data);
 
      localStorage.setItem('loggedInUser', JSON.stringify({ email: signUpData.email }));
      setSignUpData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        gender: '',
        pan: '',
        password: '',
        confirmPassword: ''
      });
 
      setShowSignUp(false);
      navigate('/employee-dashboard');
    } catch (error) {
      alert('Registration failed ❌');
    }
  };
 
  return (
    <div className="lp-container">
      <div className="lp-left">
        <img className="lp-logo" src="loginlogo.png" alt="Logo" />
      </div>
 
      <div className="lp-right">
        <div className="lp-scroll">
          {!showSignUp ? (
            <form onSubmit={handleLogin} className="lp-form">
              <h2>Welcome Back</h2>
              <p>Please login to your account</p>
 
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setLoginStatusMessage('');
                }}
                placeholder="Enter your email"
                required
              />
              {emailError && <p className="lp-error">{emailError}</p>}
 
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginStatusMessage('');
                }}
                placeholder="Enter your password"
                required
              />
 
              <button type="submit">Login</button>
 
              {loginStatusMessage && (
                <p className={loginStatusMessage.includes('success') ? 'lp-success' : 'lp-error'}>
                  {loginStatusMessage}
                </p>
              )}
 
              <p className="lp-forgot" onClick={() => setShowForgotModal(true)}>
                Forgot Password?
              </p>
              <p className="lp-signup">
                Don’t have an account? <span onClick={() => setShowSignUp(true)}>Sign Up</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="lp-form">
              <h2>Sign Up</h2>
 
              <label>First Name</label>
              <input name="firstName" value={signUpData.firstName} onChange={handleSignUpChange} required />
 
              <label>Last Name</label>
              <input name="lastName" value={signUpData.lastName} onChange={handleSignUpChange} required />
 
              <label>Email</label>
              <input name="email" type="email" value={signUpData.email} onChange={handleSignUpChange} required />
              {signUpErrors.email && <p className="lp-error">{signUpErrors.email}</p>}
 
              <label>Contact</label>
              <input name="contact" type="tel" value={signUpData.contact} onChange={handleSignUpChange} required />
 
              <label>Gender</label>
              <select name="gender" value={signUpData.gender} onChange={handleSignUpChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
 
              <label>PAN</label>
              <input name="pan" value={signUpData.pan} onChange={handleSignUpChange} required />
              {signUpErrors.pan && <p className="lp-error">{signUpErrors.pan}</p>}
 
              <label>Password</label>
              <input name="password" type="password" value={signUpData.password} onChange={handleSignUpChange} required />
 
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
                required
              />
              {signUpErrors.confirmPassword && <p className="lp-error">{signUpErrors.confirmPassword}</p>}
 
              <button type="submit">Register</button>
              <p className="lp-signup">
                Already have an account? <span onClick={() => setShowSignUp(false)}>Login</span>
              </p>
            </form>
          )}
        </div>
      </div>
 
      {showForgotModal && (
          <div className="lp-forgot-modal">
            <div className="lp-modal-content">
              <h2>Forgot Password</h2>
              <p>Please enter your email to receive a password reset OTP.</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              {resetEmailError && <p className="lp-error">{resetEmailError}</p>}
              <button onClick={handleSendOtp}>Send OTP</button>
              {otpStatusMessage && (
                <p className={otpStatusMessage.includes('success') ? 'lp-success' : 'lp-error'}>
                  {otpStatusMessage}
                </p>
              )}
              <button className="lp-close-btn" onClick={() => setShowForgotModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
 
export default LoginPage;