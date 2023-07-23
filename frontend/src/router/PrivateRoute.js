import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
    const isAuthenticated = !!user; // Change this condition based on your authentication logic
    const location = useLocation();

    return isAuthenticated ? (
        children
    ) : (
        <Navigate
            to="/login"
            state={{ from: location.pathname }}
        />
    );
};

export default PrivateRoute;
