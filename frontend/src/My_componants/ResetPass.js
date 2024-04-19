import React, { useState, useEffect } from 'react';
import './ResetPass.css';

const ResetPass = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({ email: '' });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    newPassword,
                    confirmPassword,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'An error occurred while resetting password');
            }

            setEmail('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            closeModal();
            console.log('Password reset successful');
        } catch (error) {
            console.error('Error resetting password:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className="reset-pass-popup">
            <div className="reset-pass-inner">
                <form onSubmit={handleSubmit}>
                    <div className="form-group-reset">
                        <h2>Reset Password</h2>
                        <button type="button" className="close-button" onClick={closeModal}>Close</button>
                    </div>

                    <div className="form-group-reset">
                        <input
                            className='reset-email'
                            placeholder='Email'
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group-reset">
                        <input
                            className='reset-pass'
                            placeholder='Enter New Password'
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group-reset">
                        <input
                            className='reset-con'
                            placeholder='Confirm Password'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="btn-group">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;




// import React, { useState, useEffect } from 'react';
// import './ResetPass.css';

// const ResetPass = ({ closeModal }) => {
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [userData, setUserData] = useState({ email: "" });

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const fetchUserData = async () => {
//         try {
//             const response = await fetch('/getdata', {
//                 mode: 'no-cors',
//                 method: 'GET',
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include"
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }

//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         // Check if new password matches confirm password
//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             // Make POST request to reset password route
//             const response = await fetch('/reset-password', {
//                 mode: 'no-cors',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     email,
//                     newPassword,
//                     confirmPassword,
//                 }),
//             });

//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.error || "An error occurred while resetting password");
//             }

//             // Reset form fields and close modal
//             setEmail('');
//             setNewPassword('');
//             setConfirmPassword('');
//             setError('');
//             closeModal();
//             console.log("Password reset successful");
//         } catch (error) {
//             console.error("Error resetting password:", error.message);
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="reset-pass-popup">
//             <div className="reset-pass-inner">
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group-reset">
//                         <h2>Reset Password</h2>
//                         <button type="button" className="close-button" onClick={closeModal}>Close</button>
//                     </div>

//                     <div className="form-group-reset">
//                         <input
//                             className='reset-email'
//                             placeholder='Email'
//                             type="email"
//                             value={userData.email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="form-group-reset">
//                         <input
//                             className='reset-pass'
//                             placeholder='Enter New Password'
//                             type="password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="form-group-reset">
//                         <input
//                             className='reset-con'
//                             placeholder='Confirm Password'
//                             type="password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {error && <p className="error-message">{error}</p>}

//                     <div className="btn-group">
//                         <button type="submit" className="submit-button">Submit</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPass;
