import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth-context';
import { Card, Group, SimpleGrid, Text, Button, Image, UnstyledButton, TextInput, NumberInput, Loader, Pagination } from "@mantine/core";
import axios from "axios";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { notifications } from '@mantine/notifications';
import { IconBell, IconCar, IconStar } from '@tabler/icons-react';
import { Icon } from '@mui/material';

function UserCard() {
    const [otpsent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const { user, logout, login } = useAuth();
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pin, setPin] = useState('');
    const [telephone, setTelephone] = useState("");
    const [userPhone, setUserPhone] = useState()
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)
    const [resend, setResend] = useState(false)
    const [showResend, setShowResend] = useState(false)
    const [countdown, setCountdown] = useState(30);
    const [startCountdown, setStartCountdown] = useState(null);
    const [showLogouOption, setShowLogoutOption] = useState(false)


    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, [startCountdown]);

    useEffect(() => {
        if (countdown === 0) {
            // Perform any action you want when the countdown reaches zero
            setShowResend(true);
        }
    }, [countdown]);


    const handleOtp = (e) => {
        e.preventDefault();
        setSubmitting(true);
        axios.post(`${API_URL}auth/send-sms/`, { numbers: telephone })
            .then((response) => {
                console.log(response.data);
                if (response.data.return === true) {
                    setOtpSent(true);
                    setOtp(response.data.code);
                    setSubmitting(false);
                    setCountdown(30);
                    setTimeout(() => {
                        setShowResend(true)
                    }, 30000)
                }
                else {
                    setShowError(true);
                    setSubmitting(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setShowError(true);
                setSubmitting(false);
            });
    }

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

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (pin == otp) {
                const phoneNumberExists = checkPhoneNumberExists(telephone);

                if (phoneNumberExists) {
                    login({
                        username: telephone,
                        password: telephone
                    });
                    setSubmit(false);

                } else {
                    const decoded = await registerUser(
                        {
                            username: telephone,
                            password: telephone,
                            admin: false,
                            email: `${telephone}@jodomi.com`,
                            active: true,
                            first_name: telephone,

                        }
                    );
                    const loginData = {
                        username: telephone,
                        password: telephone
                    };
                    const decodedLogin = await login(loginData);
                    // navigate('/')
                    setSubmit(false);

                }

                setSubmit(false);
            } else {
                setError(true);
                setOtpError(true);
            }
        } catch (error) {
            console.error(error);
        }

        setSubmitting(false);
    };

    const resendSubmit = () => {
        setCountdown(30);
        setShowResend(false);
        // Send the form data to Django backend
        axios.post(`${API_URL}auth/send-sms/`, { numbers: telephone })
            .then((response) => {
                console.log(response.data);

                if (response.data.return === true) {
                    setOtp(response.data.code)
                    setResend(true)
                    setTimeout(() => {
                        setResend(false)
                    }, 10000)
                    notifications.show(
                        {
                            title: 'OTP Sent',
                            message: 'OTP has been sent to your phone number',
                            color: 'teal',
                            autoClose: 5000,
                        },

                    )
                }
                else {
                    console.log("error")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <Card shadow="sm" padding="xl">
            <Card.Section m="xl" p="xl">
                {
                    user ? (
                        showLogouOption ? (
                            <Group position='apart'>
                                <div>
                                    <Text size="md" fz={20} color="black" fw={500}>
                                        Phone: +91{user?.username}
                                    </Text>
                                    <UnstyledButton onClick={handleLogout}>
                                        <Text size="xl" fw={500} color='blue' mt="xl">
                                            Logout & Sign in to another account
                                        </Text>
                                        <br />
                                    </UnstyledButton>
                                    <Group>
                                        <button className="primary-btn"
                                            style={{
                                                color: "black",
                                                backgroundColor: "white",
                                                fontSize: "12px",
                                                backgroundColor: "orange",
                                                borderRadius: "0px",
                                            }}
                                            onClick={(e) => setShowLogoutOption(false)}
                                        >
                                            CONTINUE CHECKOUT
                                        </button>

                                    </Group>
                                </div>
                                <div>
                                    <Text size="md" fz={20} color="dimmed" fw={500}>
                                        Advantages of our secure login
                                    </Text>


                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <UnstyledButton style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconCar size="20px" color="blue" />
                                            <Text size="md" fz={20} color="black" fw={500} style={{ marginLeft: '5px' }}>
                                                Easily track orders, Hassle free returns
                                            </Text>
                                        </UnstyledButton>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <IconBell size="20px" color="blue" />
                                        <Text size="md" fz={20} color="black" fw={500} style={{ marginLeft: '5px' }}>
                                            Get relevant recommendations
                                        </Text>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <IconStar size="20px" color="blue" />
                                        <Text size="md" fz={20} color="black" fw={500} style={{ marginLeft: '5px' }}>
                                            Save items to your Wishlist
                                        </Text>
                                    </div>
                                </div>

                            </Group>
                        ) : (
                            <Group position="apart">
                                <UnstyledButton color="gray">
                                    <Text size="xl" fz={30} color="dimmed" fw={500}>
                                        1. Login
                                    </Text>
                                    <Text size="xl" fw={500}>
                                        {
                                            "+91" + user?.username
                                        }
                                    </Text>
                                </UnstyledButton>
                                <UnstyledButton color="gray">
                                    <button className="primary-btn"
                                        style={{
                                            color: "black",
                                            backgroundColor: "white",
                                            fontSize: "12px",
                                            border: "0.4px solid blue",
                                        }}
                                        onClick={(e) => setShowLogoutOption(true)}
                                    >
                                        Change
                                    </button>
                                </UnstyledButton>
                            </Group>
                        )
                    ) : (

                        <Group position="apart">
                            <form>
                              
                                {
                                    submitting && (
                                        <Loader size="xl" variant="bars" />
                                    )
                                }

                                <div>
                                    <TextInput placeholder="Phone Number"
                                        size="lg"
                                        value={telephone}
                                        type="number"
                                        onChange={(e) => setTelephone(e.target.value)}
                                        required
                                        disabled={otpsent}
                                        icon={<Text size="xl" color='black' > +91 | </Text>}
                                    />

                                    {
                                        otpsent && (
                                            <UnstyledButton color="gray"
                                                onClick={
                                                    () => setOtpSent(false)
                                                }
                                            >
                                                <Text color='blue'>
                                                    Change Number
                                                </Text>
                                            </UnstyledButton>
                                        )
                                    }
                                </div>
                                {
                                    showError && (
                                        <Text color="red" size="xl">
                                            Phone Number is not correct
                                        </Text>
                                    )
                                }

                                {
                                    otpsent ? (
                                        <>
                                            <TextInput placeholder="Enter OTP"
                                                type="number"
                                                size="lg"
                                                value={pin}
                                                onChange={(e) => setPin(e.target.value)}

                                            />
                                            {
                                                !showResend && (
                                                    <Text color="red" size="xl">
                                                        Resend OTP in {countdown} seconds
                                                    </Text>
                                                )
                                            }
                                            {
                                                showResend && (
                                                    <UnstyledButton color="gray"
                                                        onClick={() => resendSubmit()}
                                                    >
                                                        <Text color='blue'>
                                                            Resend OTP
                                                        </Text>
                                                    </UnstyledButton>
                                                )
                                            }
                                            {
                                                otpError && (
                                                    <Text color="red" size="xl">
                                                        OTP is not correct
                                                    </Text>

                                                )
                                            }
                                            <button type="submit" className="btn btn-warning"
                                                onClick={handleOtpVerify}
                                                style={{
                                                    marginTop: "10px",
                                                    color: "black",
                                                    width: "100%",
                                                    fontWeight: "bold",
                                                    backgroundColor: "orange",
                                                }}
                                            >
                                                LOGIN
                                            </button>
                                            <Text size="lg" align="left" m="xl">
                                                By Continuing, you agree to the
                                                <Link to="/terms-and-conditions" style={{ textDecoration: "none", color: '#ff3e6c' }}>
                                                    {" "} Terms of Service
                                                </Link>
                                                {" "} &
                                                <Link to="/privacy-policy" style={{ textDecoration: "none", color: '#ff3e6c' }}>
                                                    {" "} Privacy Policy
                                                </Link>
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text size="lg" align="left" m="xl">
                                                By Continuing, you agree to the
                                                <Link to="/terms-and-conditions" style={{ textDecoration: "none", color: '#ff3e6c' }}
                                                target='_blank'
                                                >
                                                    {" "} Terms of Service
                                                </Link>
                                                {" "} &
                                                <Link to="/privacy-policy" style={{ textDecoration: "none", color: '#ff3e6c' }}>
                                                    {" "} Privacy Policy
                                                </Link>
                                            </Text>
                                            <button type="submit" className="btn btn-warning"
                                                onClick={handleOtp}
                                                style={{
                                                    marginTop: "10px",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    backgroundColor: "orange",
                                                }}
                                            >
                                                Continue
                                            </button>
                                        </>

                                    )
                                }




                            </form>

                        </Group>
                    )
                }


            </Card.Section>

        </Card>
    )
}

export default UserCard