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


function App() {
  return (
    <Provider store={store}>
      <Notifications position="top-center" zIndex={2077} />
        <Router>
          <Routes>
          <Route path="/*" element={<MainRoute />} />
          </Routes>
        </Router>
    </Provider>

  );
}

export default App;

