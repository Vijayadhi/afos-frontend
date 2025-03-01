import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const [seatNumber, setSeatNumber] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if seat_number is already in sessionStorage
        const seatNumber = sessionStorage.getItem('seat_number');

        // If seat_number is available, redirect to home page (or another page)
        if (seatNumber) {
            navigate('/'); // Redirect to home page or dashboard if logged in
        }
    }, [navigate]);


    const getToken = async (seatNumber) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/seats/token/`, {
                seat_number: seatNumber
            });

            // Store the token in localStorage or sessionStorage
            if (response.data.token) {
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('seat_number', response.data.seat_number);
                navigate('/')
                console.log('Token retrieved successfully');
            }
        } catch (error) {
            setError('Error getting token: ' + error.response.data.error); // Display error message
            console.log('Error getting token:', error.response.data);
        }
    };

    const handleLoginClick = () => {
        if (seatNumber) {
            getToken(seatNumber); // Pass seat number to getToken function
        } else {
            setError('Please enter a seat number');
        }
    };

    return (
        <>
            <div className="container-fluid ps-md-0">
                <div className="row g-0">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">Welcome back!</h3>

                                        <form>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    placeholder="Seat Number"
                                                    value={seatNumber}
                                                    onChange={(e) => setSeatNumber(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Seat Number</label>
                                            </div>

                                            {error && <p className="text-danger">{error}</p>}

                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                    type="button"
                                                    onClick={handleLoginClick} // Call handleLoginClick on button click
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginComponent;
