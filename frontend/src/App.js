import React, { useEffect, useState } from 'react';
import { MantineProvider, Text, Button, Input, TextInput, Group, Modal } from '@mantine/core';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,

} from "react-router-dom";
import { Provider } from 'react-redux';
import MainRoute from './router/MainRoute';
import store from './actions/store';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from '../src/context/auth-context';
import { IconBell } from '@tabler/icons-react';
import { API_URL } from './constants';
import axios from 'axios';
import NewsLetterBell from './components/NewsLetterBell';

function App() {


  return (
    <AuthProvider>
      <Provider store={store}>
        <Notifications position="top-center" zIndex={2077} />
        <Router>
          <Routes>
            <Route path="/*" element={<MainRoute />} />
          </Routes>
          <NewsLetterBell />
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
