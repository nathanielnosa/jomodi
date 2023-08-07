import React, {useEffect, useState} from 'react';
import { Container, Text, Divider, Paper, Badge, Group } from '@mantine/core';
import { API_URL } from '../../constants';
import axios from 'axios';
import { useClipboard } from '@mantine/hooks';
import { IconClipboard } from '@tabler/icons-react';

const Coupon = () => {
    const availableCoupons = [
        { code: 'SUMMER20', discount: '20%', description: 'Summer Sale: 20% off on all products' },
        { code: 'FREESHIP', discount: 'Free', description: 'Free Shipping on orders over $50' },
    ];

    const [coupons, setCoupons] = useState([]);
    const clipboard = useClipboard({ timeout: 500 });

    useEffect(() => {
        axios.get(`${API_URL}order/coupon/`)
            .then(res => {
                console.log(res.data.results)
                setCoupons(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <Container size="md">
            <Text size="xl" align="center" style={{ marginBottom: '1rem' }}>
                Available Coupons
            </Text>

            <Divider style={{ margin: '1rem 0' }} />

            {coupons?.map((coupon, index) => (
                <Paper key={index} shadow="xs" style={{ padding: '1rem', marginBottom: '1rem' }}>
                    <Group position="left">
                    <Text size={30} weight={600}>
                        {coupon.code} 
                    </Text>
                        <IconClipboard
                            onClick={() => clipboard.copy(coupon.code)}
                            style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                        />
                    </Group>
                    <Text size={25} color="gray">
                        {coupon.description}
                    </Text>
                    <Badge color="teal" style={{ marginTop: '0.5rem' }} size='xl'>
                       ₹ {coupon.discount} Discount
                    </Badge>
                </Paper>
            ))}
        </Container>
    );
};

export default Coupon;
