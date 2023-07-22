import React, { useState } from 'react'
import { Button, Card, TextInput, Text } from '@mantine/core'
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { API_URL } from '../constants';

export default function Login({ handleLogin }) {
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the form data to Django backend
        axios.post(`${API_URL}auth/send-sms/` , { numbers: phone })
            .then((response) => {
                console.log(response.data);
                
                if (response.data.return === true) {
                    navigate('/otp-verification', { state: { phone: phone, code: response.data.code } });
                }
                else {
                    alert("Invalid Phone Number");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("OTP not sent");
            });
    };



    return (
        <div style={{
            alignItems: 'center', justifyContent: 'center', minHeight: '100px',
            width: '300px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'

        }}>
            <Card shadow="sm" padding="xl" style={{ Width: 2000 }}>
                <h2 style={{
                    textAlign: 'center', fontWeight: 'bolder',
                    fontSize: '1.5rem', fontFamily: 'Greycliff CF, sans-serif',
                    marginTop: '10px'
                }}>Login or Sign UP</h2>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        mt="xl"
                        mb="xl"
                        label="Phone Number"
                        size='lg'
                        value={phone}
                        onChange={(event) => setPhone(event.currentTarget.value)}
                        placeholder="Enter your phone number"
                        required
                    />
                
                    <button
                        className='btn btn-primary btn-block'
                        style={{
                            marginTop: 20,
                            backgroundColor: '#1a202c',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        type="submit"

                    >
                        Get Code
                    </button>
                </form>

            </Card>
        </div>

        // <Grid mx={10}>
        //     <Grid.Col md={5} sm={12} mt={20}>
        //         <Link to="/" style={{ textDecoration: "none" }}>
        //             <Image src="/assets/images/logo.png" width={70} height={100} maw={240} mx="auto" radius="md" />
        //         </Link>

        //         <Title
        //             align="center"
        //             sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        //         >
        //             Welcome back!
        //         </Title>
        // <Text color="dimmed" size="sm" align="center" mt={5}>
        //     Do not have an account yet?{' '}
        //     <Anchor size="sm" component="button">
        //         <Link to="/register" style={{ textDecoration: "none" }}>
        //             Create account
        //         </Link>
        //     </Anchor>
        // </Text>

        //         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        //             <Box component="form" onSubmit={handleSubmit}>
        //                 <TextInput
        //                     label="Email"
        //                     placeholder="hello@mantine.dev"
        //                     value={form.values.email}
        //                     onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        //                     error={(form.errors.email && 'Invalid email') || (error && error)}
        //                     radius="md"
        //                     size="lg"
        //                     withAsterisk
        //                 />

        //                 <PasswordInput

        //                     label="Password"
        //                     placeholder="Your password"
        //                     value={form.values.password}
        //                     onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
        //                     error={error && error}
        //                     radius="md"
        //                     size="lg"
        //                     withAsterisk
        //                 />

        //                 <Group position="apart" mt="lg">
        //                     <Checkbox label="Remember me" />
        //                     <Anchor component="button" size="sm">
        //                         <Link to="forgot-password" style={{ textDecoration: "none" }}>
        //                             Forgot password?
        //                         </Link>

        //                     </Anchor>
        //                 </Group>
        //                 <Button fullWidth mt="xl" type="submit" size="lg" loading={submit}>
        //                     Sign in
        //                 </Button>
        //             </Box>
        //         </Paper>
        //     </Grid.Col>
        //     <Grid.Col sm={7} lg={7}>
        //         <Box mx="auto" >
        //             <BackgroundImage
        //                 src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        //                 radius="sm"
        //                 style={{ height: "100vh" }}
        //             >
        //                 <Center p="md">
        //                     <Text color="#fff">
        //                         BackgroundImage component can be used to add any content on image. It is useful for hero headers and
        //                         other similar sections
        //                     </Text>
        //                 </Center>
        //             </BackgroundImage>
        //         </Box>
        //     </Grid.Col>
        // </Grid>

    );
}