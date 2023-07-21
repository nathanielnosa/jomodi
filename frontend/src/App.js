import React, { useEffect, useState } from 'react';
import { MantineProvider, Text } from '@mantine/core';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from 'react-redux';
import MainRoute from './router/MainRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import NavCat from './components/NavCat';
import store from './actions/store';
import { Notifications } from '@mantine/notifications';
import { AuthProvider} from '../src/context/auth-context';


function App() {
  return (
    <AuthProvider>
    <Provider store={store}>
      <Notifications position="top-center" zIndex={2077} />
        <Router>
          <Routes>
          <Route path="/*" element={<MainRoute />} />
          </Routes>
        </Router>
    </Provider>
    </AuthProvider>

  );
}

export default App;

