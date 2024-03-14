// import React, { useEffect, useState } from "react";
// import "./ParkLevel.css";
// import Header from "./Header";
// import { Footer } from "./Footer";
// import Car from './Car';
// import Pay from "./PG/pay";
// import { io } from "socket.io-client";

// export const ParkLevel = () => {
//   const [receivedData, setReceivedData] = useState("");

//   useEffect(() => {
//     const socket = io('http://localhost:5500');

//     socket.on('data', (data) => {
//       setReceivedData(data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);


//   return (
//     <div>
//       <Header />
//       <div className="received-data">
//         Received Data: {receivedData}
//       </div>
//       <div className="col-12 d-flex justify-content-center align-items-center">
//         <Car bt_no={1}></Car>
//         <Car bt_no={2}></Car>
//         <Car bt_no={3}></Car>
//       </div>
//       <div className="col-12 d-flex justify-content-center align-items-center"><Pay></Pay></div>
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
      <div className="received-data">
        Received Data: {receivedData}
      </div>
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
