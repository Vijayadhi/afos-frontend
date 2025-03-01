import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute checks for seat number
const PrivateRoute = ({ element }) => {
  const seatNumber = sessionStorage.getItem('seat_number'); // Get seat number from sessionStorage or another source

  // If no seat number, redirect to login page
  if (!seatNumber) {
    return <Navigate to="/login" />;
  }

  // If seat number exists, allow access to the requested route
  return element;
};

export default PrivateRoute;
