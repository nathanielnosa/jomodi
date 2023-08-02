import React, { useState } from 'react'
import { Button, Card, TextInput, Text, Group, Container, Loader } from '@mantine/core'
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { API_URL } from '../constants';

export default function Login({ handleLogin }) {
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [showError, setShowError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const  location  = useLocation();


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Send the form data to Django backend
        axios.post(`${API_URL}auth/send-sms/`, { numbers: phone })
            .then((response) => {
                console.log(response.data);

                if (response.data.return === true) {
                    navigate('/otp-verification', { state: { phone: phone, code: response.data.code, redirectPath: redirectPath } });
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
    };


    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/';
    return (
        <Container size="30rem" px={0}>
            <Group position='apart'>
                <div>
                    <Text fz={30} fw="bolder" size="xl" align="left" mt="xl">
                        Flat off 50% + 
                    </Text>
                    <Text fz={30} fw="bolder" size="lg" align="left" mt="xl">
                        Free Shipping
                    </Text>
                    <Text  size="lg" align="left" mt="sm">
                        On Your First Order
                    </Text>
                </div>
                <img src="/img/jomo.jpg" alt="logo" style={{ width: '40%', height: '60%' }} />


            </Group>

            <Card shadow="sm" p="xl" style={{ height: '50vh' }}>
                <Group position="left" mt="xl">
                    <Text fz={30} fw="bolder" size="xl" align="left" mt="xl">
                        Login
                    </Text>
                    <Text fz={30} size="lg" align="left" mt="xl">
                        or
                    </Text>
                    <Text fz={30} fw="bolder" size="xl" align="left" mt="xl">
                        SignUp
                    </Text>

                </Group>
                {
                    submitting && <Loader size="xl" variant="dots"
                        style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}
                    />
                }
                <form onSubmit={handleSubmit}>
                    <TextInput
                        mt="xl"
                        mb="xl"
                        size='lg'
                        value={phone}
                        onChange={(event) => setPhone(event.currentTarget.value)}
                        placeholder="Mobile Number"
                        required
                        icon={<Text size="xl" color='black' > +91 | </Text>}
                    />
                    {
                        showError && (
                            <Text size="lg" align="left" mt="xl" color="red">
                                Invalid Phone Number
                            </Text>
                        )
                    }

                    <Text size="lg" align="left" mt="xl">
                        By Continuing, you agree to the
                        <Link to="/terms-and-conditions" style={{ textDecoration: "none", color: '#ff3e6c' }}>
                            {" "} Terms of Service
                        </Link>
                        {" "} &
                        <Link to="/privacy-policy" style={{ textDecoration: "none", color: '#ff3e6c' }}>
                            {" "} Privacy Policy
                        </Link>
                    </Text>
                  

                    <button
                        className='btn btn-primary btn-block'
                        style={{
                            marginTop: 20,
                            backgroundColor: '#ff3e6c',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '100%',
                            borderRadius: 0,
                            borderColor: '#ff3e6c',
                        }}
                        type="submit"
                        disabled={submitting}

                    >
                        Continue
                    </button>
                </form>
                <Text mb="xl" size="lg" align="left" mt="xl">
                    Have Trouble Logging In? <Link to="/help" style={{ textDecoration: "none", color: '#ff3e6c' }}>
                        Get Help
                    </Link>

                </Text>

            </Card>

        </Container>



    );
}