import { useState } from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import InvalidPopup from './InvalidPopup';
import './Signup.css';

function SignupForm() {

  const [showInvalidPopup, setShowInvalidPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    vehicle: "",
    phone: "",
    password: "",
    conpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, vehicle, phone, password, conpassword } = user

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
    }
    if (res.message === 'password are not matching') {
      setShowPasswordPopup(true);
      console.log("password are not matching");
    }
    else {
      setShowInvalidPopup(true);
      console.log("Invalid Registration");
    }

  }

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
        {showInvalidPopup && (
          <InvalidPopup trigger={true} setTrigger={setShowInvalidPopup}>
            <h3>Invalid Credentials</h3>
          </InvalidPopup>
        )}
        {showPasswordPopup && (
          <InvalidPopup trigger={true} setTrigger={setShowPasswordPopup}>
            <h3>Passwords are not mactching</h3>
          </InvalidPopup>
        )}
      </div>
    </div>
  );
}

export default SignupForm;