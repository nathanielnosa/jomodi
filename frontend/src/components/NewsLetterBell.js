import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants';
import axios from 'axios';
import { MantineProvider, Text, Button, Input, TextInput, Group, Modal } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

function NewsLetterBell() {
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
        <div>
            <div style={{
                position: 'fixed', bottom: '20px', right: '20px', zIndex: 999,
                backgroundColor: 'blue',
                borderRadius: '50%',
                padding: '10px',
            }}>
                <IconBell size={30} color='white' onClick={() => setShowNewsletterForm(!showNewsletterForm)} />
            </div>

            {/* Newsletter form */}
            {showNewsletterForm && (
                <div class="wrapper">
                    <div class="top">
                        <i class="fas fa-envelope-open-text"></i>
                        {
                            success && (
                                <Text color='green'>Thank you for subscribing to our newsletter</Text>
                            )
                        }

                        {
                            error && (
                                <Text color='red'>Something went wrong, please try again</Text>
                            )

                        }
                    </div>
                    <div class="bottom">
                        <div class="info">
                            Subscribe to our channel and<br />get the latest updates
                        </div>
                        <form onSubmit={() => handleNewsletterFormSubmit}>
                            <div class="input-box">
                                <input type="text" placeholder="Enter your name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required />
                            </div>
                            <div class="input-box">
                                <input type="text" placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div class="input-box">
                                <input type="submit" value="Subscribe" />
                            </div>
                        </form>
                        <div class="footer">
                            Don't worry, we don't spam
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewsLetterBell