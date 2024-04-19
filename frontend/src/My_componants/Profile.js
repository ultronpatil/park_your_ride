import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import ResetPass from './ResetPass'; // Import ResetPass component
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import './Profile.css'


const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)', // Transparent background
  },
  content: {
    backgroundColor: 'transparent', // Transparent content background
    border: 'none', // No border
  },
};


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal
  const history = useHistory();

  const callProfilePage = async () => {
    try {
      const res = await fetch('/profile', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callProfilePage();
  }, []);

  const gotoreset = () => {
    // Open the modal when "Reset Password" button is clicked
    setModalIsOpen(true);
  };

  return (
    <>
      <Header />
      <div className='profile-contain'>
        {userData ? (
          <div className=''>
            <div className='profile-head'>Welcome to your profile {userData.name}</div>
            <div className="profile-name">Name : {userData.name}</div>
            <div className="profile-email">Email : {userData.email}</div>
            <div className="profile-phne">Phone : {userData.phone}</div>
            <div className="profile-vehicle">Vehicle Registration no : {userData.vehicle}</div>
            <button className="reset_button" onClick={gotoreset}>Reset Password</button>
          </div>
        ) : (
          <div>You are not logged in.</div>
        )}
      </div>
      <Footer />

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <ResetPass closeModal={() => setModalIsOpen(false)} />
      </Modal>
    </>
  );
};

export default Profile;
