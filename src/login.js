import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './login.css';


function Login({ onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    let emailError = '';
    let passwordError = '';
  
    if (!email || !email.includes('@') || !email.includes('.')) {
      emailError = 'Please enter a valid email address.';
    }
  
    if (!password) {
      passwordError = 'Please enter a password.';
    }else{
      passwordError = 'Invalid email or password.';
    }
  
    setEmailError(emailError);
    setPasswordError(passwordError);


  
    const loggedIn = onLogin(email, password);
    if (loggedIn) {
      navigate("/");
    } 
  

  };

  return (
    <div >
    <img src="./logo.png" alt="Logo" className="login-logo" />
    <div className="login-container">
      <h2 className="login-header" >Login Page</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="email-label" >Email:</label>
          <input className="email-input"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="form-group">
          <label className="password-label">Password:</label>
          <input className="password-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>

        <button className="login-button"  type="submit">Login</button>

        <p className="register link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Login;
