import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InvalidPopup from './InvalidPopup';
import './Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInvalidPopup, setShowInvalidPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch(
      '/signin', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("here");
    result = await result.json();
    console.warn(result);
    if (result.message === 'Login successful') {
      setEmail('');
      setPassword('');
      history.push('/home');
    } else {
      setShowInvalidPopup(true);
      setEmail('');
      setPassword('');
      history.push('/login');
    }
  };

  return (
    <div class="login-background">
      <div className="login-container">

        <form method='POST'>
          <div className='title'>Login Account</div>
          <div className='email'><input
            placeholder='Email ID'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /></div>
          <div className='password'><input
            placeholder='Password'
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /></div>
          {<div className="error-message"></div>}
          <div className='signup-here'>
            New user? <Link to="/signup">Sign up here</Link>.
          </div>
          <button className="login_button" type="submit" onClick={handleLogin}>Login</button>

        </form>
        {showInvalidPopup && (
          <InvalidPopup trigger={true} setTrigger={setShowInvalidPopup}>
            <h3>Invalid Credentials</h3>
          </InvalidPopup>
        )}
      </div>
    </div>
  );
}

export default Login;
