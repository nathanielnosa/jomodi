import React from 'react'
import { Card, Text, Badge, ActionIcon, Group, Container, Image, Button } from '@mantine/core';

function Order() {
  const orderData = [
    {
      productName: 'Product 1',
      price: 19.99,
      quantity: 2,
      status: 'shipped',
      image: 'https://images.unsplash.com/photo-1612833609248-0b1e8e2b2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
      productName: 'Product 2',
      price: 24.99,
      quantity: 1,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1612833609248-0b1e8e2b2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    },
  ];

  return (
    <Container size="lg">
      {orderData.map((item, index) => (
        <Card key={index} shadow="sm" padding="lg" mt="xl">
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Image src={item.image} width={100} height={100} />

              <Group position="left">
                <div>
                  <Text size="lg" style={{ color: 'gray' }}>
                    Order Date
                  </Text>
                  <Text size="lg" style={{ color: 'gray' }}>
                    12/12/2020
                  </Text>

                </div>
                <div>
                  <Text size="lg" style={{ color: 'gray' }}>
                    Order ID
                  </Text>
                  <Text size="lg" style={{ color: 'gray' }}>
                    #1234567890
                  </Text>

                </div>

                <div>
                  <Text size="lg" style={{ color: 'gray' }}>
                    Order Price
                  </Text>
                  <Text size="lg" style={{ color: 'gray' }}>
                    ₹{item.price.toFixed(2)}
                  </Text>

                </div>

              </Group>
            </Group>
          </Card.Section>
          <Group position="apart">
            <div>
              <Text size="xl" weight={500} style={{ marginBottom: '1rem' }}>
                {item.productName}
              </Text>
              <Text size="lg" style={{ color: 'black', marginBottom: '1rem' }}>
                Quantity: {item.quantity}
              </Text>
            </div>
            <Button variant="outline" color="red" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}>
              cancel
            </Button>
          </Group>
          <Badge fz="xl" p="xl" color={item.status === 'shipped' ? 'teal' : 'gray'}>
            {item.status === 'shipped' ? 'Shipped' : 'Pending'}
          </Badge>
        </Card>
      ))}
    </Container>
  )
}

export default Order