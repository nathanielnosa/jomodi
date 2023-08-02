import React, { useState, useEffect } from 'react';
import { PinInput, Card, Text, Group, Loader } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';
import { useAuth } from '../context/auth-context';
import { registerUser } from '../actions/auth'
import axios from 'axios'


function VerifyOTP() {
    const navigate = useNavigate()
    const { loginUser, user } = useAuth();
    const { login } = useAuth();
    const code = useLocation().state?.code;
    const redirectPath = useLocation().state?.redirectPath;
    const [code1, setCode1] = useState(code)
    const [pin, setPin] = useState('');
    const phone = useLocation().state?.phone;
    const [userPhone, setUserPhone] = useState()
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)
    const [resend, setResend] = useState(false)

    const isAuthenticated = localStorage.getItem('authenticated');

    const handleChange = (value) => {
        setPin(value);
    };

    const resendSubmit = (e) => {
        e.preventDefault();
        // Send the form data to Django backend
        axios.post(`${API_URL}auth/send-sms/`, { numbers: phone })
            .then((response) => {
                console.log(response.data);
                if (response.data.return === true) {
                    setCode1(response.data.code)
                    setResend(true)
                    setTimeout(() => {
                        setResend(false)
                    }, 10000)
                }
                else {
                    console.log("error")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get(`${API_URL}auth/user`)
            .then(res => {
                console.log(res.data.results)
                setUserPhone(res.data.results.map((item) => item.username))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const checkPhoneNumberExists = (phoneNumber) => {
        return userPhone.includes(phoneNumber);
    };

    const handleVerify = async () => {
        setSubmit(true);

        if (pin == code1) {

            const phoneNumberExists = checkPhoneNumberExists(phone);

            if (phoneNumberExists) {
                await login({
                    username: phone,
                    password: phone
                });
                setSubmit(false);
                setInterval(() => {
                    navigate(redirectPath);
                }, 1000);
                // user &&
            } else {
                const decoded = await registerUser(
                    {
                        username: phone,
                        password: phone,
                        admin: false,
                        email: `${phone}@jodomi.com`,
                        active: true,
                        first_name: phone,
                    }
                );
                const loginData = {
                    username: phone,
                    password: phone
                };
                const decodedLogin = await login(loginData);
                setInterval(() => {
                    navigate(redirectPath);
                }, 1000);
                // user && navigate(redirectPath);
                setSubmit(false);

            }
        } else {
            setSubmit(false);
            setError(true)
            console.log("error")
        }
    };


    useEffect(() => {
        // Check if 'pin' is a valid 4-digit number before calling handleVerify
        if (/^\d{4}$/.test(pin)) {
            handleVerify();
        }
    }, [pin]);


    return (
        <div style={{
            alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
            width: '300px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'
        }}>
            <Card shadow="sm" padding="xl" p="xl" style={{ Width: 2000, height: '70vh' }}>
                <h2 style={{
                    textAlign: 'center', fontWeight: 'bolder',
                    fontSize: '1.5rem', fontFamily: 'Greycliff CF, sans-serif',
                    marginTop: '10px'
                }}>Verify with OTP </h2>
                {
                    submit && <Loader size="xl" variant="dots"
                        style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}
                    />
                }
                <Text
                    mt="xl"
                    mb="xl"
                    style={{
                        textAlign: 'center', fontSize: '1.2rem',
                        fontFamily: 'Greycliff CF, sans-serif'
                    }}>
                    Enter the OTP sent to {phone}
                    <br />
                    <Text color="dimmed" size="sm" align="center" mt="xl">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            Edit Number
                        </Link>
                    </Text>
                </Text>
                <Text size="lg" align="center" mt="xl">
                    <Link onClick={resendSubmit} style={{ textDecoration: "none" }}>
                        Resend OTP
                    </Link>
                </Text>
                <form>
                    <Group position="center" mt="xl">
                        <PinInput
                            size="xl"
                            mt="xl"
                            type="number"
                            inputType="number"
                            inputMode="numeric"
                            value={pin}
                            onChange={handleChange}
                        />
                    </Group>
                    {
                        error && <Text color="red" size="lg" align="center" mt="xl">
                            Incorrect OTP
                        </Text>
                    }
                </form>
            </Card>
        </div>
    );
}

export default VerifyOTP;
