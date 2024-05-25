
// import React, { useState, useEffect } from 'react';
// import Car from './Car';
// import Header from '../My_componants/Header';
// import { Footer } from '../My_componants/Footer';
// import Pay from './PG/pay';
// import { io } from "socket.io-client";
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Timer from './Timer';

// export const ParkLevel = () => {
//   const [sensorData, setSensorData] = useState("");
//   const [carState, setCarState] = useState({
//     1: false,
//     2: false
//   });
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [maxSelection, setMaxSelection] = useState(1);
//   const [userEmail, setUserEmail] = useState("");
//   const [startTimer, setStartTimer] = useState(false);

//   useEffect(() => {
//     const socket = io('http://localhost:5500');

//     socket.on('data', (data) => {
//       setSensorData(data);
//       const parsedData = JSON.parse(data);
//       setCarState((prevState) => ({
//         ...prevState,
//         [parsedData.slotNumber]: parsedData.state === "Occupied" ? true : false
//       }));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const fetchUserInfo = async () => {
//     try {
//       const token = Cookies.get('jwtoken');

//       const response = await fetch("/getdata", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         credentials: 'include'
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUserEmail(data.email);
//         console.log(data.email);
//       } else {
//         console.error("Failed to fetch user information:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching user information:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserInfo();

//     // Check if there's an existing timer
//     const savedEndTime = localStorage.getItem('bookingEndTime');
//     if (savedEndTime && Date.now() < savedEndTime) {
//       setStartTimer(true);
//     }
//   }, []);

//   const handleSlotSelect = (slotNumber) => {
//     if (selectedSlots.includes(slotNumber)) {
//       setSelectedSlots(selectedSlots.filter(slot => slot !== slotNumber));
//     } else {
//       if (selectedSlots.length < maxSelection) {
//         setSelectedSlots([...selectedSlots, slotNumber]);
//       } else {
//         setSelectedSlots([...selectedSlots.slice(1), slotNumber]);
//       }
//     }
//     alert(`Car in slot ${slotNumber} selected!`);
//   };

//   const handlePaymentSuccess = () => {
//     alert("Payment successful! You have booked slot number(s) " + selectedSlots.join(', '));
//     setBookedSlots([...bookedSlots, ...selectedSlots]);
//     setSelectedSlots([]);
//     handleReserveSlot(selectedSlots, userEmail);
//     setStartTimer(true);
//   };

//   const handleReserveSlot = async (selectedSlots, userEmail) => {
//     console.log("this is inner log data", { selectedSlots, userEmail });
//     try {
//       const token = Cookies.get('jwtoken');

//       const response = await axios.post('http://localhost:3002/reserveSlot', {
//         selectedSlots: selectedSlots,
//         email: userEmail
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         withCredentials: true // Similar to credentials: 'include' in fetch
//       });

//       alert('Slot reserved successfully');
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message);
//       alert('Error reserving slot');
//     }
//   };

//   const handleDropdownChange = (e) => {
//     const value = parseInt(e.target.value);
//     setMaxSelection(value);
//     if (selectedSlots.length > value) {
//       setSelectedSlots(selectedSlots.slice(0, value));
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="col-12 d-flex justify-content-center align-items-center">
//         <Car slotNumber={1} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(1)} isBooked={bookedSlots.includes(1)} state={carState[1]} />
//         <Car slotNumber={2} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(2)} isBooked={bookedSlots.includes(2)} state={carState[2]} />
//       </div>

//       <div>
//         <label htmlFor="slots">Number of slots to book:</label>
//         <select id="slots" value={maxSelection} onChange={handleDropdownChange}>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//         </select>
//       </div>

//       <Pay onPaymentSuccess={handlePaymentSuccess} maxSelection={maxSelection} selectedSlots={selectedSlots} />
//       {startTimer && <Timer start={startTimer} />}
//       <Footer />
//     </div>
//   );
// };

// export default ParkLevel;







import React, { useState, useEffect } from 'react';
import Car from './Car';
import Header from '../My_componants/Header';
import { Footer } from '../My_componants/Footer';
import Pay from './PG/pay';
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import axios from 'axios';
import Timer from './Timer';

export const ParkLevel = () => {
  const [sensorData, setSensorData] = useState("");
  const [carState, setCarState] = useState({
    1: false,
    2: false
  });
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [maxSelection, setMaxSelection] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5500');

    socket.on('data', (data) => {
      setSensorData(data);
      const parsedData = JSON.parse(data);
      setCarState((prevState) => ({
        ...prevState,
        [parsedData.slotNumber]: parsedData.state === "Occupied" ? true : false
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = Cookies.get('jwtoken');

      const response = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUserEmail(data.email);
        console.log(data.email);
      } else {
        console.error("Failed to fetch user information:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();

    // Check if there's an existing timer
    const savedEndTime = localStorage.getItem('bookingEndTime');
    if (savedEndTime && Date.now() < savedEndTime) {
      setStartTimer(true);
    }
  }, []);

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
    handleReserveSlot(selectedSlots, userEmail);
    setStartTimer(true);
  };

  const handleReserveSlot = async (selectedSlots, userEmail) => {
    console.log("this is inner log data", { selectedSlots, userEmail });
    try {
      const token = Cookies.get('jwtoken');

      const response = await axios.post('http://localhost:3002/reserveSlot', {
        selectedSlots: selectedSlots,
        email: userEmail
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true // Similar to credentials: 'include' in fetch
      });

      alert('Slot reserved successfully');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error reserving slot');
    }
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
      </div>

      <div>
        <label htmlFor="slots">Number of slots to book:</label>
        <select id="slots" value={maxSelection} onChange={handleDropdownChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>

      <Pay onPaymentSuccess={handlePaymentSuccess} maxSelection={maxSelection} selectedSlots={selectedSlots} />
      {startTimer && <Timer start={startTimer} />}
      <Footer />
    </div>
  );
};

export default ParkLevel;
