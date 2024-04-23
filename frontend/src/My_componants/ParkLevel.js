// import React from "react";
// import { useState } from "react";
// import "./ParkLevel.css";
// import carImage from "./car.png";
// import bookedImage from "./booked.jpg";
// import Header from "./Header";
// import { Footer } from "./Footer";

// export const ParkLevel = () => {

//   const handlestagev1 = async (e) => {
//     e.preventDefault();
//     let result = await fetch("/vacantv1", {
//       method: "post",
//       body: JSON.stringify({ status: "occoupied", bt_no: 1 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("here");
//     result = await result.json();
//     console.log(result);
//     // console.warn(result);
//     if (result.message === "state changed") {
//       alert("state changed");
//     } else {
//       alert("Button state failed");
//     }

//     // var btn = document.getElementById("but1");
//     // btn.innerHTML = "done";
//   };

//   //////

//   const handlestagev2 = async (e) => {
//     e.preventDefault();
//     let result = await fetch("/vacantv1", {
//       method: "post",
//       body: JSON.stringify({ status: "occoupied", bt_no: 2 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("here");
//     result = await result.json();
//     console.log(result);
//     // console.warn(result);
//     if (result.message === "state changed") {
//       alert("state changed");
//     } else {
//       alert("Button state failed");
//     }
//   };

//   ///////////

//   const handlestagev3 = async (e) => {
//     e.preventDefault();
//     let result = await fetch("/vacantv1", {
//       method: "post",
//       body: JSON.stringify({ status: "occoupied", bt_no: 3 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("here");
//     result = await result.json();
//     console.log(result);
//     // console.warn(result);
//     if (result.message === "state changed") {
//       alert("state changed");
//     } else {
//       alert("Button state failed");
//     }
//   };

//   ////////

//   const handlestagev4 = async (e) => {
//     e.preventDefault();
//     let result = await fetch("/vacantv1", {
//       method: "post",
//       body: JSON.stringify({ status: "occoupied", bt_no: 4 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("here");
//     result = await result.json();
//     console.log(result);
//     // console.warn(result);
//     if (result.message === "state changed") {
//       alert("state changed");
//     } else {
//       alert("Button state failed");
//     }
//   };

//   //////

//   const handlestagev5 = async (e) => {
//     e.preventDefault();
//     let result = await fetch("/vacantv1", {
//       method: "post",
//       body: JSON.stringify({ status: "occoupied", bt_no: 5 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("here");
//     result = await result.json();
//     console.log(result);
//     // console.warn(result);
//     if (result.message === "state changed") {
//       alert("state changed");
//     } else {
//       alert("Button state failed");
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div>
//         <button className="b1" onClick={handlestagev1} id="but1" value="my value"></button>
//         <button className="b1" onClick={handlestagev2}></button>
//         <button className="b1" onClick={handlestagev3}></button>
//         <button className="b1" onClick={handlestagev4}></button>
//         <button className="b1" onClick={handlestagev5}></button>
//       </div>
//       <Footer />
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";
// import "./ParkLevel.css";
// import Header from "./Header";
// import { Footer } from "./Footer";
// import Car from './Car';
// import Pay from "./PG/pay";
// import { io } from "socket.io-client";

// export const ParkLevel = () => {
//   const [receivedData, setReceivedData] = useState("");
//   const [buttonStatus, setButtonStatus] = useState({
//     1: false,
//     2: false,
//     3: false
//   });

//   useEffect(() => {
//     const socket = io('http://localhost:5500');

//     socket.on('data', (data) => {
//       setReceivedData(data);
//       const parsedData = JSON.parse(data);
//       setButtonStatus({
//         ...buttonStatus,
//         [parsedData.bt_no]: parsedData.status === "Occupied" ? true : false
//       });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [buttonStatus]);

//   return (
//     <div>
//       <Header />

//       <div className="col-12 d-flex justify-content-center align-items-center">
//         <Car bt_no={1} status={buttonStatus[1]} />
//         <Car bt_no={2} status={buttonStatus[2]} />
//         <Car bt_no={3} status={buttonStatus[3]} />
//       </div>
//       <div className="col-12 d-flex justify-content-center align-items-center"><Pay></Pay></div>
//       <Footer />
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import Car from './Car';
import Header from '../My_componants/Header';
import { Footer } from '../My_componants/Footer';
import Pay from './PG/pay';
import { io } from "socket.io-client";

export const ParkLevel = () => {

  const [sensorData, setSensorData] = useState("");
  const [carState, setCarState] = useState({
    1: false,
    2: false
  });

  useEffect(() => {
    const socket = io('http://localhost:5500');

    socket.on('data', (data) => {
      setSensorData(data);
      const parsedData = JSON.parse(data);
      setCarState({
        ...carState,
        [parsedData.slotNumber]: parsedData.state === "Occupied" ? true : false
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [carState]);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [maxSelection, setMaxSelection] = useState(1);

  const handleSlotSelect = (slotNumber) => {
    if (selectedSlots.includes(slotNumber)) {
      setSelectedSlots(selectedSlots.filter(slot => slot !== slotNumber));
    } else {
      if (selectedSlots.length < maxSelection) {
        setSelectedSlots([...selectedSlots, slotNumber]);
      } else {
        setSelectedSlots([...selectedSlots.slice(1), slotNumber]);
      }
    }
    alert(`Car in slot ${slotNumber} selected!`);
  };

  const handlePaymentSuccess = () => {
    alert("Payment successful! You have booked slot number(s) " + selectedSlots.join(', '));
    setBookedSlots([...bookedSlots, ...selectedSlots]);
    setSelectedSlots([]);
  };

  const handleDropdownChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxSelection(value);
    if (selectedSlots.length > value) {
      setSelectedSlots(selectedSlots.slice(0, value));
    }
  };

  return (
    <div>
      <Header />
      <div className="col-12 d-flex justify-content-center align-items-center">
        <Car slotNumber={1} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(1)} isBooked={bookedSlots.includes(1)} state={carState[1]} />
        <Car slotNumber={2} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(2)} isBooked={bookedSlots.includes(2)} state={carState[2]} />
        {/* <Car slotNumber={3} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(3)} isBooked={bookedSlots.includes(3)} />
        <Car slotNumber={4} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(4)} isBooked={bookedSlots.includes(4)} />
        <Car slotNumber={5} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(5)} isBooked={bookedSlots.includes(5)} /> */}
      </div>

      <div>
        <label htmlFor="slots">Number of slots to book:</label>
        <select id="slots" value={maxSelection} onChange={handleDropdownChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          {/* <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option> */}
        </select>
      </div>

      <Pay onPaymentSuccess={handlePaymentSuccess} maxSelection={maxSelection} selectedSlots={selectedSlots} />
      <Footer />
    </div>
  );
};

export default ParkLevel;
