import React, { useState, useEffect } from 'react';
import './Car.css';
import axios from 'axios';

const Car = ({ slotNumber, onSlotSelect, isSelected, state, userEmail }) => {
    const [isBooked, setIsBooked] = useState(false);
    const [isOccupied, setIsOccupied] = useState(state);

    useEffect(() => {
        const fetchReservationStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/checkSlotStatus/${slotNumber}`);
                const { booked } = response.data;
                setIsBooked(booked);
            } catch (error) {
                console.error('Error fetching slot status:', error);
            }
        };

        fetchReservationStatus();
    }, [slotNumber]);

    useEffect(() => {
        setIsOccupied(state);
    }, [state]);


    const handleOccupancyChange = (isOccupied) => {
        // Check if the slot is occupied and booked by the current user
        if (isOccupied && isBooked && userEmail) {
            generateAlertForUser();
        }
    };

    const generateAlertForUser = () => {
        const isUser = window.confirm("Someone is parking on your spot, is this you?\n1. Yes\n2. No");
        if (isUser) {
            alert("Thanks for parking");
        } else {
            alert("Alarm has been raised");
        }
    };

    useEffect(() => {
        handleOccupancyChange(isOccupied);
    }, [isOccupied, isBooked, userEmail]);


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
