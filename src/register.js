import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './register.css';


function Register({ users, setUsers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    
        // Very basic email validation
        if (!email || !email.includes('@') || !email.includes('.')) {
          emailError = 'Please enter a valid email address.';
        } else {
          emailError= '';
        }

        if (!password) {
          passwordError = 'Please enter a password.';
        } else {
          passwordError = '';
        }

        if (!confirmPassword || confirmPassword !== password) {
          confirmPasswordError= 'Passwords do not match.';
        } else {
          confirmPasswordError = '';
        }

        setEmailError(emailError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);

    if (!emailError && !passwordError && !confirmPasswordError) {
      setUsers([...users, { email, password }]);
      navigate("/login");
    }
  };

  return (
    <div >
    <img src="./logo.png" alt="Logo" className="register-logo" />
    <div className="register-container">
      <h2 className="register-header">Register Page</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="email-label">Email:</label>
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
        <div className="form-group">
          <label className="password-label">Confirm Password:</label>
          <input className="password-input"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <div className="error">{confirmPasswordError}</div>
          )}
        </div>
        <button className="register-button" type="submit">Register</button>
        <p className="login link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      </div>    
      </div>
  );
}


export default Register;
