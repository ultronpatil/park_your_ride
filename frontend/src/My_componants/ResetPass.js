import React, { useState } from 'react';
import './ResetPass.css'
const ResetPass = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, you can perform validation before submitting
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);
        // Close the modal after form submission
        closeModal();
    };

    return (
        <div className="reset-pass-popup">
            <div className="reset-pass-inner">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <h2>Reset Password</h2>
                        <button type="button" className="close-button" onClick={closeModal}>Close</button>
                    </div>


                    <div className="form-group">
                        <input
                            className='reset-email'
                            placeholder='Email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <input
                            className='reset-pass'
                            placeholder='Enter New Password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <input
                            className='reset-con'
                            placeholder='Confirm Password'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="submit-button">Submit</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;
