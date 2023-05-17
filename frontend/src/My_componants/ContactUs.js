import React, { useState } from 'react';
import './ContactUs.css'

import Header from './Header';
import { Footer } from './Footer'

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch(
      'http://localhost:5000/feedback', {
          method: "post",
          body: JSON.stringify({ name, email,message }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      result = await result.json();
      console.warn(result);
      if (result) {
          alert("Data saved succesfully");
          setEmail("");
          setName("");
          setMessage("");
      }
  };

  return (
    <div> <Header></Header>
      <h1>Contact Us</h1>
      <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
      <Footer></Footer>
    </div>
  );
}

export default ContactUs
