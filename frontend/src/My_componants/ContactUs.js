import React, {useEffect, useState } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import contactimg from './contactus.avif';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [userData, setUserData]=useState({name:"", email:"", message:""});

  const callUserInfo = async () =>{
    try {
      const res = await fetch('/getdata',{
        method:'GET',
        headers:{
          "Content-Type": "application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:data.name, email:data.email, message:data.message});

      if(!res.status === 200){
        const error = new Error(res.error)
        throw error;
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
  callUserInfo();
  },[]);

  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({... userData, [name]:value});
  
  }

  const submitInputs = async (e) =>{
    e.preventDefault();

    let {name, email, message} = userData;
    let res = await fetch('/feedback', {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,email,message
      })
    });

    // const data = await res.json();
    res = await res.json();
    if(res.message === "error"){
      console.log("message not sent");
      window.alert("message not sent");
    }else{
      alert("message send");
      setUserData({...userData, message:""});
    }
    

  }

  return (
    <div>
      <Header />

      <div
        className="container-fluid "
        style={{
          backgroundImage: `url(${contactimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <div className="row">
          <div className="col-md-6 bg-white p-4 rounded shadow p-4">
            <h1 className="mb-4">Contact Us</h1>
            <form method='POST'>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message:
                </label>
                <textarea
                  className="form-control"
                  name="message"
                  value={userData.message}
                  onChange={handleInput}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitInputs}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;

