import React from 'react'
import Header from './Header';
import { Footer } from './Footer'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LogoutPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('http://localhost:5000/user', { withCredentials: true })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    // Logout the user by sending a POST request to the server
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(res => {
        setUser(null);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div><Header></Header></div>
      <h1>Logout Page</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Password: {user.password}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <Link to="/login">Login</Link>
        </>
      )}
       <div><Footer></Footer>
</div>
    </>
  );
}

export default LogoutPage;

