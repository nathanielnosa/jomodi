import React, { useEffect, useState } from 'react'
import { Card, Text, Badge, ActionIcon, Group, Container, Image, Button } from '@mantine/core';
import axios from 'axios';
import { API_URL } from '../constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

function Order() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const { user } = useAuth();



  useEffect(() => {
    fetchOrderData();
  }, []);


  const fetchOrderData = () => {
    axios
      .get(`${API_URL}order/order-fetch/?user_id=${user?.user_id}`)
      .then((res) => {
        const sortedData = res.data.results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrderData(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (id) => {
    axios
      .patch(`${API_URL}order/order/${id}/`, {
        status: 'Cancel Requested',
        cancel: true,
      })
      .then((res) => {
        console.log(res.data);
        // After successful cancellation, fetch the updated order data
        fetchOrderData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deleteOrder = (id) => {
  //   axios
  //     .delete(`${API_URL}order/order/${id}/`)
  //     .then((res) => {
  //       console.log(res.data);
  //       // After successful cancellation, fetch the updated order data
  //       fetchOrderData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  return (
    <Container size="lg">
      {
        orderData && (
          orderData?.map((item, index) => (
            item?.products?.map((product, index) => (
              <Card key={index} shadow="sm" padding="lg" mt="xl">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group position="apart">
                    <Image src={product?.image} width={100} height={100} />

                    <Group position="apart">
                      <div>
                        <Text size="lg" style={{ color: 'gray' }}>
                          Order Date
                        </Text>
                        <Text size="lg" style={{ color: 'gray' }}>
                          {dayjs(item?.created_at).format('DD/MM/YYYY')}
                        </Text>

                      </div>
                      <div>
                        <Text size="lg" style={{ color: 'gray' }}>
                          Order ID
                        </Text>
                        <Text size="lg" style={{ color: 'gray' }}>
                          #{item?.order_id}
                        </Text>

                      </div>

                      <div>
                        <Text size="lg" style={{ color: 'gray' }}>
                          Order Price
                        </Text>
                        <Text size="lg" style={{ color: 'gray' }}>
                          ₹{item?.total?.toFixed(2)}
                        </Text>

                      </div>

                    </Group>
                  </Group>
                </Card.Section>
                <Group position="apart">
                  <div>
                    <Text size="xl" weight={500} style={{ marginBottom: '1rem' }}>
                      {product?.name}
                    </Text>
                    <Text size="lg" fz="lg" style={{ color: 'black', marginBottom: '1rem' }}>
                      Quantity: {product?.quantity}
                    </Text>
                  </div>
                  <Button variant="outline" color="red" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                    onClick={() => handleCancel(item?.id)}
                    disabled={item?.cancel}
                  >
                    cancel
                  </Button>

                  {/* <Button variant="outline" color="red" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                    onClick={() => deleteOrder(item?.id)}

                  >
                    Delete
                  </Button> */}
                </Group>
                <Badge fz="xl" p="xl" color={item.status === 'Shipping in Progress' ? 'teal' : 'red'}>
                  {item.status}
                </Badge>
              </Card>
            ))
          ))
        )
      }
      {
        orderData?.length === 0 && (
          <Card shadow="sm" padding="lg" mt="xl">
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Text size="xl" fz="xl" fw="bold" style={{ color: 'gray' }}>
                  No Orders
                </Text>
              </Group>

              <Button variant="outline" color="teal" size="lg" radius="xl" m={80} style={{ marginRight: '1rem' }}
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </Card.Section>
          </Card>

        )
      }
    </Container>
  )
}

export default Order