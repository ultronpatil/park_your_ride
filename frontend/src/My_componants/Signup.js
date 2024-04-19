import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import InvalidPopup from './InvalidPopup';
import './Signup.css';

function SignupForm() {
  const [showInvalidPopup, setShowInvalidPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    vehicle: "",
    phone: "",
    password: "",
    conpassword: ""
  });
  const history = useHistory();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, vehicle, phone, password, conpassword } = user;

    let res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, vehicle, phone, password, conpassword
      })
    });

    res = await res.json();
    console.warn(res);
    if (res.message === 'Register successful') {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push('/Login');
    } else if (res.message === 'password are not matching') {
      setShowPasswordPopup(true);
      console.log("password are not matching");
    } else {
      setShowInvalidPopup(true);
      console.log("Invalid Registration");
    }
  }

  const handleCloseInvalidPopup = () => setShowInvalidPopup(false);
  const handleClosePasswordPopup = () => setShowPasswordPopup(false);

  return (
    <div className="sign-background">
      <div className="sign-container">
        <form action="" method="POST">
          <div className='title'>Create Account</div>
          <div className="name">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleInputs}
            />
          </div>
          <div className="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleInputs}
            />
          </div >
          <div className="vehicle">
            <input
              type="text"
              name="vehicle"
              id="vehicle"
              placeholder="Enter your vehicle number"
              value={user.vehicle}
              onChange={handleInputs}
            />
          </div>
          <div className="phone">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              value={user.phone}
              onChange={handleInputs}
            />
          </div>
          <div className="password">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Create your password"
              value={user.password}
              onChange={handleInputs}
            />
          </div>
          <div className="conpassword">
            <input
              type="text"
              name="conpassword"
              id="conpassword"
              placeholder="Confirm your password"
              value={user.conpassword}
              onChange={handleInputs}
            />
          </div>
          <div className="login-here">
            Already user? <Link to="/login">Login here</Link>.
          </div>
          <button className="sign_button" type="submit" onClick={PostData}>Submit</button>

        </form>

        {/* Invalid Popup */}
        <InvalidPopup show={showInvalidPopup} handleClose={handleCloseInvalidPopup} title="Invalid Credentials">
          <h3>Invalid Credentials</h3>
        </InvalidPopup>

        {/* Password Mismatch Popup */}
        <InvalidPopup show={showPasswordPopup} handleClose={handleClosePasswordPopup} title="Passwords Mismatch">
          <h3>Passwords are not matching</h3>
        </InvalidPopup>
      </div>
    </div>
  );
}

export default SignupForm;

