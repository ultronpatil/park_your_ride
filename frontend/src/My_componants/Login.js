import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch(
      'http://localhost:5000/login', {
          method: "post",
          body: JSON.stringify({email, password}),
          headers: {
              'Content-Type': 'application/json'
          }
      })
    console.log("here");
    result = await result.json();
    console.warn(result);
    if (result.message === 'Login successful') {
      alert('Login successful');
      setEmail('');
      setPassword('');
      history.push('/home');
    } else {
      alert('Invalid email or password');
      setEmail('');
      setPassword('');
      history.push('/login');
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login </h1>
      <form >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {<div className="error-message"></div>}

        <button type="submit" onClick={handleLogin}>Login</button>
        <p>
          New user? <Link to="/signup">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
}

export default Login;
