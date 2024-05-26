// import React, { useState, useEffect } from 'react';

// const Timer = ({ start }) => {
//     const [seconds, setSeconds] = useState(0);

//     useEffect(() => {
//         if (start) {
//             const savedEndTime = localStorage.getItem('bookingEndTime');
//             if (savedEndTime && Date.now() < savedEndTime) {
//                 const initialSeconds = Math.max(Math.floor((savedEndTime - Date.now()) / 1000), 0);
//                 setSeconds(initialSeconds);
//                 const countdown = setInterval(() => {
//                     setSeconds((prevSeconds) => {
//                         const newSeconds = prevSeconds - 1;
//                         if (newSeconds <= 0) {
//                             clearInterval(countdown);
//                             localStorage.removeItem('bookingEndTime');
//                         }
//                         return newSeconds;
//                     });
//                 }, 1000);
//                 return () => clearInterval(countdown);
//             } else {
//                 const endTime = Date.now() + 60 * 1000; // Set end time to 1 minute (60 seconds)
//                 localStorage.setItem('bookingEndTime', endTime);
//                 setSeconds(60); // Set initial seconds to 60
//                 const countdown = setInterval(() => {
//                     setSeconds((prevSeconds) => {
//                         const newSeconds = prevSeconds - 1;
//                         if (newSeconds <= 0) {
//                             clearInterval(countdown);
//                             localStorage.removeItem('bookingEndTime');
//                         }
//                         return newSeconds;
//                     });
//                 }, 1000);
//                 return () => clearInterval(countdown);
//             }
//         }
//     }, [start]);

//     return (
//         <div className="booking-timer">
//             <h2>Booking Timer: {seconds}s</h2>
//         </div>
//     );
// };

// export default Timer;





import React, { useState, useEffect } from 'react';

const Timer = ({ start }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (start) {
            const savedEndTime = localStorage.getItem('bookingEndTime');
            if (savedEndTime && Date.now() < savedEndTime) {
                const initialSeconds = Math.max(Math.floor((savedEndTime - Date.now()) / 1000), 0);
                setSeconds(initialSeconds);
                const countdown = setInterval(() => {
                    setSeconds((prevSeconds) => {
                        const newSeconds = prevSeconds - 1;
                        if (newSeconds <= 0) {
                            clearInterval(countdown);
                            localStorage.removeItem('bookingEndTime');
                        }
                        return newSeconds;
                    });
                }, 1000);
                return () => clearInterval(countdown);
            } else {
                const endTime = Date.now() + 300000; // Set end time to 5 minutes (300 seconds)
                localStorage.setItem('bookingEndTime', endTime);
                setSeconds(300); // Set initial seconds to 300
                const countdown = setInterval(() => {
                    setSeconds((prevSeconds) => {
                        const newSeconds = prevSeconds - 1;
                        if (newSeconds <= 0) {
                            clearInterval(countdown);
                            localStorage.removeItem('bookingEndTime');
                        }
                        return newSeconds;
                    });
                }, 1000);
                return () => clearInterval(countdown);
            }
        }
    }, [start]);

    return (
        <div className="booking-timer">
            <h2>Booking Timer: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}s</h2>
        </div>
    );
};

export default Timer;
