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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { API_URL } from '../constants';

export default function Login({ handleLogin }) {
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            terms: true,
        },

        validate: {
            email: isEmail('Invalid email'),
            password: isNotEmpty('Enter your password'),
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        try {
            const userData = {
                email: form.values.email,
                password: form.values.password
            };
            const decoded = await login(userData);
            navigate('/')
            setSubmit(false);
            setError(null);
        } catch (err) {
            console.log("aad", err);
            setError(err.message);  // set the error message in the state
            setSubmit(false)
        }
    }

    return (
        <Grid mx={10}>
            <Grid.Col md={5} sm={12} mt={20}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Image src="/assets/images/logo.png" width={70} height={100} maw={240} mx="auto" radius="md" />
                </Link>

                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Welcome back!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button">
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            Create account
                        </Link>
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextInput
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={(form.errors.email && 'Invalid email') || (error && error)}
                            radius="md"
                            size="lg"
                            withAsterisk
                        />

                        <PasswordInput

                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={error && error}
                            radius="md"
                            size="lg"
                            withAsterisk
                        />

                        <Group position="apart" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm">
                                <Link to="forgot-password" style={{ textDecoration: "none" }}>
                                    Forgot password?
                                </Link>

                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" type="submit" size="lg" loading={submit}>
                            Sign in
                        </Button>
                    </Box>
                </Paper>
            </Grid.Col>
            <Grid.Col sm={7} lg={7}>
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