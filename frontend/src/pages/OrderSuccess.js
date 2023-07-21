import React from 'react';
import { Container, Text, Title, Badge, Paper, Button } from '@mantine/core';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {

    const navigate = useNavigate();
    const getDeliveryDate = () => {
        const today = dayjs();
        const deliveryDate = today.add(7, 'day');

        // Format the delivery date as "DD/MM/YYYY"
        const formattedDeliveryDate = deliveryDate.format('DD-MMMM-YYYY');
        return formattedDeliveryDate;
    };

    return (
        <Container size="sm" mt="xl">
            <Paper padding="lg" shadow="sm">
                <Title align="center" order={2}>
                    Order Placed Successfully!
                </Title>
                <Text align="center" size="xl" style={{ marginTop: '1rem' }}>
                    Thank you for your order! Your payment has been processed successfully.
                </Text>
                {/* <Text align="center" size="sm" style={{ marginTop: '1.5rem', color: 'gray' }}>
                    Order ID: #1234567890
                </Text> */}
                <Text align="center" size="xl" mt="xl" style={{ color: 'gray' }}>
                    Estimated Delivery Date: {getDeliveryDate()}
                </Text>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.4rem', marginBottom:'20px' }}>
                    <Badge color="teal" p="xl" mb="xl" fz="xl">Order Status: Pending</Badge>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outline" color="teal" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                    onClick={() => navigate('/order')}
                    >
                        Track Order
                    </Button>
                    <Button variant="outline" color="teal" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                    onClick={() => navigate('/')}
                    >
                     Continue Shopping
                    </Button>
                </div>
            </Paper>
        </Container>
    );
}

export default OrderSuccess;
