import React from 'react';
import {Navigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        const expiration = decoded.exp;
        const now = Date.now() / 1000;
        return expiration > now;
    }
    return false;
};

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" state={{from: window.location.pathname}} />;
};

export default PrivateRoute;