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

import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { useHistory } from 'react-router-dom';

const Profile = () => {

  const [userData, setUserData] = useState(null);
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
  }

  useEffect(() => {
    callProfilePage();
  }, []);

  const gotoreset = () => {
    // Navigate to the ResetPass page
    history.push('/ResetPass');
  }

  return (
    <>
      <Header />
      <div className='container user-profile'>
        {userData ? (
          <form method='GET'>
            <div className='row'>
              <div className='profile-head'>Welcome to your profile {userData.name}</div>
              <div className="profile-name">{userData.name}</div>
              <div className="profile-email">{userData.email}</div>
              <div className="profile-phne">{userData.phone}</div>
              <div className="profile-vehicle">{userData.vehicle}</div>
              <button className="profile-button" onClick={gotoreset}>reset password</button>
            </div>
          </form>
        ) : (
          <div>You are not logged in.</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;

