import React, { useState } from 'react'
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
    Group,
    PaperProps,
    Divider,
    Stack,
    Container,
    Box, Grid, Image, BackgroundImage, Center,
} from '@mantine/core';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from '../actions/auth'
export default function Register() {
    const [submit, setSubmit] = useState(false)
    const [submitError, setSubmitError] = useState("")
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
            confirm_password: (val) => (val != form.values.password ? 'Password do not match' : null),
            phone_number: hasLength({ min: 9, max: 14 }, 'Please enter a valid phone number'),
            first_name: hasLength({ min: 2, max: 20 }, 'Please enter a valid first name'),
            last_name: hasLength({ min: 2, max: 20 }, 'Please enter a valid last name'),
        },
    });

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
            navigate('/login')
            setSubmit(false);
            setSubmitError(null);
        } catch (err) {
            console.log("aad", err);
            setSubmitError(err.message);  // set the error message in the state
            setSubmit(false)
        }
    }

    return (
        <Grid mx={10}>
            <Grid.Col md={6} sm={12}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Image src="/assets/images/logo.png" width={70} height={100} maw={240} mx="auto" radius="md" />
                </Link>

                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 600 })}
                >
                    Join{tutor && 'As a Tutor'}
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do you have an account?{' '}
                    <Anchor size="sm" component="button">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            Login
                        </Link>
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} m={10} radius="md" >
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextInput
                            label="Phone Number"
                            placeholder="Your Phone Number"
                            value={form.values.phone_number}
                            onChange={(event) => form.setFieldValue('phone_number', event.currentTarget.value)}
                            radius="md"
                            size="md"
                            error={form.errors.phone_number && 'Enter A valid Phone Number'}
                            withAsterisk
                        />
                        <TextInput
                            label="Email"
                            placeholder="hello@tantorial.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={(form.errors.email && 'Invalid email') || (submitError && submitError)}
                            radius="md"
                            size="md"
                            withAsterisk
                        />

                        <TextInput
                            label="First Name"
                            placeholder="First Name"
                            value={form.values.first_name}
                            onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
                            radius="md"
                            size="md"
                            error={form.errors.first_name && 'Enter A valid First Name'}
                            withAsterisk
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Last Name"
                            value={form.values.last_name}
                            onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
                            radius="md"
                            size="md"
                            error={form.errors.last_name && 'Enter A valid Last Name'}
                            withAsterisk
                        />
                       

                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                            size="md"
                            withAsterisk
                        />

                        <PasswordInput

                            label="Confirm Password"
                            placeholder="Confirm password"
                            value={form.values.confirm_password}
                            onChange={(event) => form.setFieldValue('confirm_password', event.currentTarget.value)}
                            error={form.errors.confirm_password && 'Password do not match'}
                            radius="md"
                            size="md"
                            withAsterisk
                        />
                        <Group position="apart" mt="lg">
                            <Checkbox
                                size="md"
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        </Group>
                        <Button fullWidth mt="xl" type="submit" size="md" loading={submit}>
                            Sign Up
                        </Button>
                    </Box>
                </Paper>
            </Grid.Col>
            <Grid.Col md={6}>
                <Box mx="auto" >
                    <BackgroundImage
                        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                        radius="sm"
                        style={{ height: "100vh" }}
                    >
                        <Center p="md">
                            <Text color="#fff">
                                BackgroundImage component can be used to add any content on image. It is useful for hero headers and
                                other similar sections
                            </Text>
                        </Center>
                    </BackgroundImage>
                </Box>
            </Grid.Col>
        </Grid>

    );
}