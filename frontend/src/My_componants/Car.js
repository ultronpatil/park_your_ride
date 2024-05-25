
// import React, { useState, useEffect } from 'react';
// import './Car.css';
// import axios from 'axios';

// const Car = ({ slotNumber, onSlotSelect, isSelected, state }) => {
//     const [isBooked, setIsBooked] = useState(false);
//     const [isOccupied, setIsOccupied] = useState(false);

//     useEffect(() => {
//         const fetchReservationStatus = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3002/checkSlotStatus/${slotNumber}`);
//                 const { booked, occupied } = response.data;
//                 setIsBooked(booked);
//                 setIsOccupied(occupied);
//             } catch (error) {
//                 console.error('Error fetching slot status:', error);
//             }
//         };

//         fetchReservationStatus();
//     }, [slotNumber]);

//     const handleClick = () => {
//         if (!isBooked && !isOccupied) {
//             onSlotSelect(slotNumber);
//             alert("Proceed to payment");
//         } else if (isBooked) {
//             alert("This slot is already booked");
//         } else if (isOccupied) {
//             alert("This slot is occupied");
//         }
//     };

//     return (
//         <div
//             className={`car-slot ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${isOccupied ? 'occupied' : ''}`}
//             onClick={handleClick}
//         >
//             Car in slot {slotNumber}
//         </div>
//     );
// };

// export default Car;






import React, { useState, useEffect } from 'react';
import './Car.css';
import axios from 'axios';

const Car = ({ slotNumber, onSlotSelect, isSelected, state }) => {
    const [isBooked, setIsBooked] = useState(false);
    const [isOccupied, setIsOccupied] = useState(false);

    useEffect(() => {
        const fetchReservationStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/checkSlotStatus/${slotNumber}`);
                const { booked, occupied } = response.data;
                setIsBooked(booked);
                setIsOccupied(occupied);
            } catch (error) {
                console.error('Error fetching slot status:', error);
            }
        };

        fetchReservationStatus();
    }, [slotNumber]);

    const handleClick = () => {
        if (!isBooked && !isOccupied) {
            onSlotSelect(slotNumber);
            alert("Proceed to payment");
        } else if (isBooked) {
            alert("This slot is already booked");
        } else if (isOccupied) {
            alert("This slot is occupied");
        }
    };

    return (
        <div
            className={`car-slot ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${isOccupied ? 'occupied' : ''}`}
            onClick={handleClick}
        >
            Car in slot {slotNumber}
        </div>
    );
};

export default Car;
