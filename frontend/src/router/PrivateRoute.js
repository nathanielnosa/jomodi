import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ user, children, redirect }) => {
    const isAuthenticated = user; // Change this condition based on your authentication logic
    const location = useLocation();
    const authenticate = localStorage.getItem('authenticated');

    return authenticate ? (
        children
    ) : (
        <Navigate
            to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
        />
    );
};

export default PrivateRoute;
