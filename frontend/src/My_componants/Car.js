// import React, { useState } from 'react';
// import './Car.css';

// const Car = ({ bt_no }) => {
//     const [buttonValue, setButtonValue] = useState('empty');

//     const handlestagev1 = async (e) => {
//         e.preventDefault();
//         let result = await fetch("/vacantv1", {
//             method: "post",
//             body: JSON.stringify({ status: "Booked", bt_no }), // Use bt_no prop
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("here");
//         result = await result.json();
//         console.log(result);
//         if (result.message === "state changed") {
//             alert("State changed");
//             setButtonValue("booked")
//         } else {
//             alert("Button state failed");
//         }
//     };

//     return (
//         <button className="button" onClick={handlestagev1}>
//             {buttonValue}
//         </button>
//     );
// };

// export default Car;










// import React, { useState } from 'react';
// import './Car.css';

// const Car = ({ bt_no }) => {
//     const [buttonValue, setButtonValue] = useState('empty');

//     const handlestagev1 = async (e) => {
//         e.preventDefault();
//         let result = await fetch("/vacantv1", {
//             method: "post",
//             body: JSON.stringify({ status: "Booked", bt_no }), // Use bt_no prop
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("here");
//         result = await result.json();
//         console.log(result);
//         if (result.message === "state changed") {
//             alert("State changed");
//             setButtonValue("booked")
//         } else {
//             alert("Button state failed");
//         }
//     };

//     return (
//         <button className="button" onClick={handlestagev1}>
//             {buttonValue}
//         </button>
//     );
// };

// export default Car;







// import React from 'react';
// import './Car.css';

// const Car = ({ bt_no, status }) => {
//     return (
//         <div className={`car-button ${status ? 'occupied' : 'vacant'}`}>
//             Button {bt_no}
//         </div>
//     );
// };

// export default Car;
// import React, { useState } from 'react';
// import './Car.css';

// const Car = ({ bt_no, status }) => {
//     const [buttonValue, setButtonValue] = useState(status ? 'occupied' : 'vacant');

//     const handleStageV1 = async () => {
//         try {
//             const result = await fetch("/vacantv1", {
//                 method: "post",
//                 body: JSON.stringify({ status: "Booked", bt_no }), // Use bt_no prop
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("here");
//             const data = await result.json();
//             console.log(data);
//             if (data.message === "state changed") {
//                 alert("State changed");
//                 setButtonValue("booked");
//             } else {
//                 alert("Button state failed");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("An error occurred");
//         }
//     };

//     return (
//         <button className={`car-button ${buttonValue} `} onClick={handleStageV1}>Button {bt_no}</button>

//     );
// };

// export default Car;




// import React, { useState } from 'react';
// import './Car.css';

// const Car = ({ bt_no, status }) => {
//     const [buttonValue, setButtonValue] = useState(status);

//     const handleStageV1 = async () => {
//         try {
//             let newStatus = '';
//             if (buttonValue === 'vacant') {
//                 newStatus = 'booked';
//             } else if (buttonValue === 'booked') {
//                 newStatus = 'occupied';
//             } else {
//                 newStatus = 'vacant';
//             }
//             const result = await fetch("/vacantv1", {
//                 method: "post",
//                 body: JSON.stringify({ status: newStatus, bt_no }), // Use bt_no prop
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             const data = await result.json();
//             if (data.message === "state changed") {
//                 alert("State changed");
//                 setButtonValue(newStatus);
//             } else {
//                 alert("Button state failed");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("An error occurred");
//         }
//     };

//     return (
//         <button className={`car-button ${buttonValue}`} onClick={handleStageV1}>Button {bt_no}</button>
//     );
// };

// export default Car;
import React from 'react';
import './Car.css';

const Car = ({ slotNumber, onSlotSelect, isSelected, isBooked }) => {
    const handleClick = () => {
        if (!isBooked) {
            onSlotSelect(slotNumber);
            alert("Proceed to payment");
        } else {
            alert("This slot is already booked");
        }
    };

    return (
        <div
            className={`car-slot ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            onClick={handleClick}
        >
            Car in slot {slotNumber}
        </div>
    );
};

export default Car;
