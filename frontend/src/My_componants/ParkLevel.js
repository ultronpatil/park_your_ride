// import React, { useState, useEffect } from 'react';
// import Car from './Car';
// import Header from '../My_componants/Header';
// import { Footer } from '../My_componants/Footer';
// import Pay from './PG/pay';
// import { io } from "socket.io-client";

// export const ParkLevel = () => {

//   const [sensorData, setSensorData] = useState("");
//   const [carState, setCarState] = useState({
//     1: false,
//     2: false
//   });

//   useEffect(() => {
//     const socket = io('http://localhost:5500');

//     socket.on('data', (data) => {
//       setSensorData(data);
//       const parsedData = JSON.parse(data);
//       setCarState({
//         ...carState,
//         [parsedData.slotNumber]: parsedData.state === "Occupied" ? true : false
//       });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [carState]);

//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [maxSelection, setMaxSelection] = useState(1);

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
//         {/* <Car slotNumber={3} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(3)} isBooked={bookedSlots.includes(3)} />
//         <Car slotNumber={4} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(4)} isBooked={bookedSlots.includes(4)} />
//         <Car slotNumber={5} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(5)} isBooked={bookedSlots.includes(5)} /> */}
//       </div>

//       <div>
//         <label htmlFor="slots">Number of slots to book:</label>
//         <select id="slots" value={maxSelection} onChange={handleDropdownChange}>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           {/* <option value={3}>3</option>
//           <option value={4}>4</option>
//           <option value={5}>5</option> */}
//         </select>
//       </div>

//       <Pay onPaymentSuccess={handlePaymentSuccess} maxSelection={maxSelection} selectedSlots={selectedSlots} />
//       <Footer />
//     </div>
//   );
// };

// export default ParkLevel;


// import React, { useState, useEffect } from 'react';
// import Car from './Car';
// import Header from '../My_componants/Header';
// import { Footer } from '../My_componants/Footer';
// import Pay from './PG/pay';
// import { io } from "socket.io-client";
// import Cookies from 'js-cookie';

// export const ParkLevel = () => {
//   const [sensorData, setSensorData] = useState("");
//   const [carState, setCarState] = useState({
//     1: false,
//     2: false
//   });

//   useEffect(() => {
//     const socket = io('http://localhost:5500');

//     socket.on('data', (data) => {
//       setSensorData(data);
//       const parsedData = JSON.parse(data);
//       setCarState({
//         ...carState,
//         [parsedData.slotNumber]: parsedData.state === "Occupied" ? true : false
//       });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [carState]);

//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [maxSelection, setMaxSelection] = useState(1);

// const getJwtToken = () => {
//   return Cookies.get('jwtoken');
// };

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

// const handlePaymentSuccess = async () => {
//   try {
//     for (const slotNumber of selectedSlots) {
//       const response = await fetch('http://localhost:3002/reserveSlot', {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: {
//           Accept: "application/json",
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${getJwtToken()}`
//         },
//         body: JSON.stringify({ slotNumber }),
//         credentials: 'include'
//       });

//       if (response.ok) {
//         // Reservation successful
//         alert(`Slot ${slotNumber} reserved successfully!`);
//         // Update the bookedSlots state with the reserved slot
//         setBookedSlots(prevBookedSlots => [...prevBookedSlots, slotNumber]);
//       } else if (response.status === 400) {
//         alert(`Slot ${slotNumber} is already booked!`);
//       } else {
//         alert(`Error reserving slot ${slotNumber}`);
//       }
//     }
//     // Clear the selected slots after successful reservations
//     setSelectedSlots([]);

//   } catch (error) {
//     console.error('Error reserving slot:', error);
//     alert('Error reserving slot');
//   }
// };


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
//         {/* <Car slotNumber={3} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(3)} isBooked={bookedSlots.includes(3)} />
//         <Car slotNumber={4} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(4)} isBooked={bookedSlots.includes(4)} />
//         <Car slotNumber={5} onSlotSelect={handleSlotSelect} isSelected={selectedSlots.includes(5)} isBooked={bookedSlots.includes(5)} /> */}
//       </div>

//       <div>
//         <label htmlFor="slots">Number of slots to book:</label>
//         <select id="slots" value={maxSelection} onChange={handleDropdownChange}>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           {/* <option value={3}>3</option>
//           <option value={4}>4</option>
//           <option value={5}>5</option> */}
//         </select>
//       </div>

//       <Pay onPaymentSuccess={handlePaymentSuccess} maxSelection={maxSelection} selectedSlots={selectedSlots} />
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
        setUserEmail(data.email)
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
  };




  const handleReserveSlot = async (selectedSlots, userEmail) => {
    console.log("this is inner log data" + selectedSlots);
    try {
      const token = Cookies.get('jwtoken');

      await axios.post('http://localhost:3002/reserveSlot', {
        selectedSlots: selectedSlots,
        email: userEmail
      }, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true // Similar to credentials: 'include' in fetch
      });

    } catch (error) {
      console.error('Error:', error);
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
      <Footer />
    </div>
  );
};

export default ParkLevel;
