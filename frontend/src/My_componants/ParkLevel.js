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











import React, { useEffect, useState } from "react";
import "./ParkLevel.css";
import Header from "./Header";
import { Footer } from "./Footer";
import Car from './Car';
import Pay from "./PG/pay";
import { io } from "socket.io-client";

export const ParkLevel = () => {
  const [receivedData, setReceivedData] = useState("");
  const [buttonStatus, setButtonStatus] = useState({
    1: false,
    2: false,
    3: false
  });

  useEffect(() => {
    const socket = io('http://localhost:5500');

    socket.on('data', (data) => {
      setReceivedData(data);
      const parsedData = JSON.parse(data);
      setButtonStatus({
        ...buttonStatus,
        [parsedData.bt_no]: parsedData.status === "Occupied" ? true : false
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [buttonStatus]);

  return (
    <div>
      <Header />

      <div className="col-12 d-flex justify-content-center align-items-center">
        <Car bt_no={1} status={buttonStatus[1]} />
        <Car bt_no={2} status={buttonStatus[2]} />
        <Car bt_no={3} status={buttonStatus[3]} />
      </div>
      <div className="col-12 d-flex justify-content-center align-items-center"><Pay></Pay></div>
      <Footer />
    </div>
  );
};

