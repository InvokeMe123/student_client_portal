import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login:', { email, password });
    // Add your login logic here
  };

  const navigateToRegister = () => {
    history.push('/register');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>random</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="create-account-button" onClick={navigateToRegister}>Create Account</button>
      </form>
    </div>
  );
};

export default LoginForm;
