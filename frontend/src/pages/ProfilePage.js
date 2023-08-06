import React, { useState, useEffect } from 'react';
import { Card, TextInput, Button, Group, Text, Grid, SimpleGrid, Container, Divider, Select, Loader, UnstyledButton } from '@mantine/core';
import { useAuth } from '../context/auth-context';
import { API_URL } from '../constants';
import { DateInput } from '@mantine/dates';
import axios from 'axios';
import ProfileInfo from '../components/profile/ProfileInfo';
import AddressInfo from '../components/profile/AddressInfo';
import RatingReview from '../components/profile/RatingReview';
import Coupon from '../components/profile/Coupon';


function ProfilePage() {
    const [showMenu, setShowMenu] = useState('profileinfo');


    return (
        <Container size="100%" px={0}>
            <Grid>
                <Grid.Col span={3}>
                    <Card shadow="sm" p="xl" style={{ height: '100vh' }}>
                        <Text m="xl" size="xl" align="center" weight="bolder">Profile Details</Text>
                        <Divider my="xl" />
                        <SimpleGrid cols={1} spacing="xl">
                            <UnstyledButton m="xl"
                                onClick={() => setShowMenu('profileinfo')}
                            >
                                <Text size="lg" weight="bold">Profile Info</Text>

                            </UnstyledButton>
                            <UnstyledButton m="xl" onClick={() => setShowMenu('addressinfo')}>
                                <Text size="lg" weight="bold">Address Info</Text>
                            </UnstyledButton>
                            <UnstyledButton m="xl"
                                onClick={() => setShowMenu('ratingreview')}
                            >
                                <Text size="lg" weight="bold">Rating & Reviews</Text>
                            </UnstyledButton>
                            <UnstyledButton m="xl"
                                onClick={() => setShowMenu('coupon')}
                            >
                                <Text size="lg" weight="bold">Coupons</Text>
                            </UnstyledButton>
                        </SimpleGrid>
                    </Card>
                </Grid.Col>
                <Grid.Col span={7}>
                    {
                        showMenu === 'profileinfo' && <ProfileInfo />
                    }
                    {
                        showMenu === 'addressinfo' && <AddressInfo />
                    }
                    {
                        showMenu === 'ratingreview' && <RatingReview />
                    }
                    {
                        showMenu === 'coupon' && <Coupon />
                    }


                </Grid.Col>
            </Grid>
        </Container>

    );
}

export default ProfilePage;
