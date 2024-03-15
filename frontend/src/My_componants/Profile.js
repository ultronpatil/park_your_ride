// import React, { useEffect, useState } from 'react'
// import Header from './Header';
// import { Footer } from './Footer'
// // import { useHistory } from 'react-router-dom';

// const Profile = () => {

//   // const history = useHistory();
//   const [userData, setUserData] = useState({});

//   const callProfilePage = async () => {
//     try {
//       const res = await fetch('/profile', {
//         method: 'GET',
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         credentials: "include"
//       });

//       const data = await res.json();
//       console.log(data);
//       setUserData(data);

//       if (!res.status === 200) {
//         const error = new Error(res.error)
//         throw error;
//       }

//     } catch (err) {
//       console.log(err);
//       // history.push('/login')
//     }
//   }

//   useEffect(() => {
//     callProfilePage();
//   }, []);



//   return (
//     <>
//       <Header></Header>
//       <div className='container user-profile'>
//         <form method='GET'>
//           <div className='row'>

//             <div className='profile-head'></div>
//             <div>{userData.name}</div>
//             <div>{userData.email}</div>
//             <div>{userData.phone}</div>
//             <div>{userData.vehicle}</div>

//           </div>
//         </form>
//       </div>
//       <Footer></Footer>
//     </>
//   )
// }

// export default Profile

// import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import { Footer } from './Footer';
// import { useHistory } from 'react-router-dom';

// const Profile = () => {

//   const [userData, setUserData] = useState(null);
//   const history = useHistory();



//   const callProfilePage = async () => {
//     try {
//       const res = await fetch('/profile', {
//         method: 'GET',
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         credentials: "include"
//       });

//       if (!res.ok) {
//         throw new Error('Failed to fetch user data');
//       }

//       const data = await res.json();
//       console.log(data);
//       setUserData(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     callProfilePage();
//   }, []);

//   const gotoreset = () => {
//     // Navigate to the ResetPass page
//     history.push('/ResetPass');
//   }

//   return (
//     <>
//       <Header />
//       <div className='container user-profile'>
//         {userData ? (
//           <form method='GET'>
//             <div className='row'>
//               <div className='profile-head'>Welcome to your profile {userData.name}</div>
//               <div className="profile-name">{userData.name}</div>
//               <div className="profile-email">{userData.email}</div>
//               <div className="profile-phne">{userData.phone}</div>
//               <div className="profile-vehicle">{userData.vehicle}</div>
//               <button className="profile-button" onClick={gotoreset}>reset password</button>
//             </div>
//           </form>
//         ) : (
//           <div>You are not logged in.</div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import ResetPass from './ResetPass'; // Import ResetPass component
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import './Profile.css'
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

      {/* Render ResetPass component as a modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <ResetPass closeModal={() => setModalIsOpen(false)} />
      </Modal>
    </>
  );
};

export default Profile;
