
// import React, { useState } from 'react';
// import './Car.css';

// const Car = ({ bt_no }) => {
//   const [buttonValue, setButtonValue] = useState('empty');

//   const handlestagev1 = async (e) => {
//     e.preventDefault();
//     let result = await fetch("/vacantv1", {
//       method: "post",
//       body: JSON.stringify({ status: "Booked", bt_no }), // Use bt_no prop
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("here");
//     result = await result.json();
//     console.log(result);
//     if (result.message === "state changed") {
//       alert("State changed");
//       setButtonValue("booked")
//     } else {
//       alert("Button state failed");
//     }
//   };

//   return (
//     <button className="button" onClick={handlestagev1}>
//       {buttonValue}
//     </button>
//   );
// };

// export default Car;

// Car.js
import React from 'react';
import './Car.css';

const Car = ({ bt_no, status }) => {
  return (
    <div className={`car-button ${status ? 'occupied' : 'vacant'}`}>
      Button {bt_no}
    </div>
  );
};

export default Car;
