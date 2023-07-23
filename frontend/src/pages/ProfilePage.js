import React, { useState, useEffect } from 'react';
import { Card, TextInput, Button, Group, Text, Grid, SimpleGrid, Container, Divider, Select, Loader } from '@mantine/core';
import { useAuth } from '../context/auth-context';
import { API_URL } from '../constants';
import { DateInput } from '@mantine/dates';
import axios from 'axios';


function ProfilePage() {
    const { user } = useAuth();

    const [userInfo, setUserInfo] = useState([])
    const [edit, setEdit] = useState(false)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(user?.username ?? '');
    const [gender, setGender] = useState('');
    const [DOB, setDOB] = useState('');
    const [location, setLocation] = useState('');
    const [phone2, setPhone2] = useState('');
    const [hint, setHint] = useState('');

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}order/profile-fetch/?user_id=${user?.user_id}`)
            .then(res => {
                const userProfile = res.data.results[0]; // Assuming the API returns only one profile
                if (userProfile) {
                    setName(userProfile.first_name);
                    setEmail(userProfile.email_address);
                    setGender(userProfile.gender);
                    setDOB(userProfile.date_of_birth);
                    setLocation(userProfile.address);
                    setPhone2(userProfile.alternate_number);
                    setHint(userProfile.hint_name);
                }
                setUserInfo(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        axios.put(`${API_URL}auth/profile/${userInfo[0].id}`, {
            first_name: name,
            last_name: '',
            email_address: email,
            phone_number: phone,
            gender: gender,
            date_of_birth: DOB,
            address: location,
            alternate_number: phone2,
            hint_name: hint,
        })
            .then((response) => {
                console.log(response.data);
                setSubmitting(false);
                setEdit(false);
            })
            .catch((error) => {
                console.error(error);
                setSubmitting(false);
            });
    };







    return (
        <Container size="100%" px={0}>
        <Container size="30%" px={0}>
            <Card shadow="sm" p="xl" style={{ height: '100vh' }}>
                <Text m="xl" size="xl" align="center" weight="bolder">Profile Details</Text>
                <Divider my="xl" />

                <form onSubmit={handleEdit}>

                    <SimpleGrid cols={1} spacing="xl" verticalSpacing="xl">
                            {
                                submitting && <Loader size="xl" variant="dots"
                                    style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}
                                />
                            }
                        <div>
                            <Group position="apart">
                                <Text size="xl">Full Name</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{name}</Text>
                                    )
                                }

                                {
                                    edit && (
                                        <TextInput
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            size='xl'
                                        />
                                    )
                                }

                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Mobile Number</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{phone}</Text>
                                    )
                                }
                                {
                                    edit && (
                                        <TextInput
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Mobile Number"
                                            size='xl'
                                        />
                                    )
                                }

                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Email ID</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{email}</Text>

                                    )
                                }
                                {
                                    edit && (
                                        <TextInput
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email ID"
                                            size='xl'
                                        />
                                    )
                                }

                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Gender</Text>

                                <Group position="right">
                                    {
                                        edit == false && (
                                            <Text size="xl" >{gender}</Text>
                                        )
                                    }
                                    {
                                        edit && (
                                            <Select
                                                size="xl"
                                                value={gender}
                                                data={[
                                                    { value: 'male', label: 'Male' },
                                                    { value: 'female', label: 'Female' }
                                                ]}
                                                onChange={setGender}
                                                maw={200}
                                            />
                                        )
                                    }

                                </Group>
                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Date of Birth</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{DOB}</Text>

                                    )
                                }
                                {
                                    edit && (
                                       <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} />
                                    )
                                }

                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Location</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{location}</Text>
                                    )
                                }
                                {
                                    edit && (
                                        <TextInput
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Location"
                                            size='xl'
                                        />
                                    )
                                }

                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Alternate Mobile</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{phone2}</Text>
                                    )
                                }
                                {
                                    edit && (
                                        <TextInput
                                            value={phone2}
                                            onChange={(e) => setPhone2(e.target.value)}
                                            placeholder="Alternate Mobile Number"
                                            size='xl'
                                        />
                                    )
                                }

                            </Group>
                        </div>
                        <div>
                            <Group position="apart">
                                <Text size="xl">Hint Name</Text>
                                {
                                    edit == false && (
                                        <Text size="xl" >{hint}</Text>
                                    )
                                }
                                {
                                    edit && (
                                        <TextInput
                                    value={hint}
                                    onChange={(e) => setHint(e.target.value)}
                                    placeholder="Hint name"
                                    size='xl'
                                />  
                                    )
                                }
                              
                            </Group>
                        </div>
                    </SimpleGrid>
                    {
                        edit == false && (
                                <button type="submit"
                                    className='btn btn-danger btn-block btn-lg'
                                    style={{
                                        width: '100%',
                                        color: 'white',
                                        backgroundColor: '#ff3d00',
                                        marginTop: 60,
                                    }}
                                    onClick={() => setEdit(true)}
                                >Edit</button>
                        )
                    }
                    {
                        edit && (
                                <button type="submit"
                                    className='btn btn-danger btn-block btn-lg'
                                    style={{
                                        width: '100%',
                                        color: 'white',
                                        backgroundColor: '#ff3d00',
                                        marginTop: 60,
                                    }}
                                    disabled={submitting}
                                >Save Changes</button>
                        )
                    }
                   
                </form>
            </Card>
        </Container>
        </Container>
    );
}

export default ProfilePage;
