import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../actions/auth';
import { API_URL } from '../constants';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser());
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            user.active == true ? localStorage.setItem('authenticated', 'true') : localStorage.setItem('authenticated', 'false');

        } else {
            setIsAuthenticated(false);
        }
    }, [user]);

    // useEffect(() => {
    //     const userData = JSON.parse(localStorage.getItem('userData'));
    //     if (userData) {
    //         setUser(userData);
    //     }
    // }, []);

    // const setUserData = (userData) => {
    //     setUser(userData);
    //     localStorage.setItem('userData', JSON.stringify(userData));
    // };


    const login = async (userData) => {
        const data = await loginUser(userData);
        setUser(data);
    };

    const register = async (userData) => {
        await registerUser(userData);
    };

    const logout = () => {
        logoutUser();
        setUser(null);
        localStorage.removeItem('authenticated');
        setIsAuthenticated(false);
    };

    const checkAuth = () => {
        const user = getCurrentUser();
        setUser(user);
    };

    const value = {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};