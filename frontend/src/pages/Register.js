import React, { useState } from 'react'
import { Card, TextInput, Text, Button, Group, Checkbox, PasswordInput } from '@mantine/core';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from '../actions/auth'
import { useAuth } from '../context/auth-context';

export default function Register() {
    const [submit, setSubmit] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const { login } = useAuth();
    const [passwordError, setPasswordError] = useState(false)
    const navigate = useNavigate();
    const tutor = useLocation().state?.tutor
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            confirm_password: '',
            terms: true,
        },

        validate: {
            email: isEmail('Invalid email'),
            password: (val) => (val.length < 8 ? 'Password should include at least 8 characters' : null),
            confirm_password: (val) => (val !== form.values.password ? 'Password do not match' : null),
            phone_number: hasLength({ min: 9, max: 14 }, 'Please enter a valid phone number'),
            first_name: hasLength({ min: 2, max: 20 }, 'Please enter a valid first name'),
            last_name: hasLength({ min: 2, max: 20 }, 'Please enter a valid last name'),
        },
    });

    const passwordValid = form.values.password === form.values.confirm_password;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);        

        try {
            const userData = {
                email: form.values.email,
                password: form.values.password,
                phone_number: form.values.phone_number,
                admin: false,
                address: "",
                country: "",
                address: "",
                zip_code: "",
                first_name: form.values.first_name,
                last_name: form.values.last_name,
            };
            const decoded = await registerUser(userData);
            const loginData = {
                email: form.values.email,
                password: form.values.password
            };
            const decodedLogin = await login(loginData);
            navigate('/')
            setSubmit(false);
            setSubmitError(null);
        } catch (err) {
            console.log("aad", err);
            setSubmitError(err.message);  // set the error message in the state
            setSubmit(false)
        }
    }

    return (
        <div style={{
            alignItems: 'center', justifyContent: 'center', minHeight: '100px',
            width: '300px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'
        }}>
            <Card shadow="sm" padding="xl" style={{ Width: 2000 }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bolder', 
            fontSize: '1.5rem', fontFamily: 'Greycliff CF, sans-serif'
            }}>
                    Register
                </h2>
                <form onSubmit={handleSubmit}>
                    <TextInput 
                        label="First Name"
                        size='lg'
                        value={form.values.first_name}
                        onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        size='lg'
                        value={form.values.last_name}
                        onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Phone Number"
                        size='lg'
                        value={form.values.phone_number}
                        error={form.errors.phone_number && 'Enter A valid Phone Number'}
                        onChange={(event) => form.setFieldValue('phone_number', event.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Email"
                        size='lg'
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        placeholder="Enter your email"
                        error={(form.errors.email && 'Invalid email') || (submitError && submitError)}
                        required
                    />
                    <TextInput
                        label="Password"
                        type="password"
                        size="lg"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        placeholder="Enter your password"
                        required
                        style={{ marginTop: 10 }}
                        error={form.errors.password}
                    />
                    <TextInput
                        label="Confirm Password"
                        type="password"
                        size="lg"
                        value={form.values.confirm_password}
                        onChange={(event) => form.setFieldValue('confirm_password', event.currentTarget.value)}
                        placeholder="Confirm your password"
                        required
                        style={{ marginTop: 10 }}
                        error={form.errors.confirm_password}
                    />
                    {
                        passwordValid ? null : (
                            <Text color="red" size="md" mt="sm">
                                Passwords do not match
                            </Text>
                        )
                    }

                    <Button
                        className='btn btn-primary btn-block'
                        style={{
                            marginTop: 20,
                            backgroundColor: '#1a202c',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'block',
                        }}
                        type="submit"
                        disabled={!passwordValid}
                    >
                        Create Account
                    </Button>
                </form>
                <Text color="dimmed" size="sm" align="center" mt="xl">
                    Already have an account? {' '}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                </Text>
            </Card>
        </div>
    );
}