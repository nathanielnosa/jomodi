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

function App() {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleNewsletterFormSubmit = (e) => {
    axios.post(`${API_URL}newsletter/newsletter/`, {
      email: email,
      first_name: firstName
    })
      .then(res => {
        console.log(res.data)
        setSuccess(true)
        setEmail('')
        setFirstName('')

        setInterval(() => {
          setSuccess(false)
        }
          , 3000)

      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  };

  return (
    <AuthProvider>
      <Provider store={store}>
        <Notifications position="top-center" zIndex={2077} />
        <Router>
  
          <Routes>
            <Route path="/*" element={<MainRoute />} />
          </Routes>

          {/* Floating button */}
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
            <IconBell size={40} color='blue' onClick={() => setShowNewsletterForm(true)} />

          </div>

          {/* Newsletter form */}
          {showNewsletterForm && (
            <div
              style={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                zIndex: 999,
                backgroundColor: 'white',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                padding: '16px',
              }}
            >
            {
              error && (
                <Text fw={700} color='red' fz="xl">This Email is already Subscribed to our newsletter 🎉</Text>
              )
            }

            {
              success && (
                <Text fw={700} color='teal' fz="xl">Thank you for subscribing to our newsletter! 🎉</Text>
              )
            }
  
                <TextInput 
                  placeholder="Enter your name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  size="sm"
                  style={{ width: '200px' }}
                  mb="xl"
                />

                <TextInput 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="sm"
                  style={{ width: '200px' }}
                />
               
              <Group position="center" mt="xl">
                <button 
                className='btn btn-primary'
                onClick={() => handleNewsletterFormSubmit()}>Subscribe</button>
              <button 
              className='btn btn-warning'
              onClick={() => {setShowNewsletterForm(false);
              setSuccess(false);
              setError(false);
              }}>Close</button>
              </Group>
            </div>
          )}

  
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
