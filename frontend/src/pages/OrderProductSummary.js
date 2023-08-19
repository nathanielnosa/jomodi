import React from 'react'
import { useLocation } from 'react-router-dom';
import { Card, Grid, Text, Image, Group, Timeline, TimelineItem, ActionIcon, Button } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots, IconFileTypePdf } from '@tabler/icons-react';
import dayjs from 'dayjs';

function OrderProductSummary() {
    const location = useLocation();
    const { order, product } = location.state;

    const active_count = order.shipped_date ? 2 : order.out_for_delivery_date ? 3 : order.delivered_date ? 4 : 1;

    return (
        <div>
            <Card padding="lg" shadow="sm">
                <Grid gutter="lg">
                    <Grid.Col span={3}
                        style={{
                            borderRight: "1px solid #e0e0e0"
                        }}
                    >
                        <Text size={30} fw={500} mt="xl">Delivery Address</Text>
                        <Text size={25} fw={500} mt="xl">
                            {order?.user_address?.full_name} {" "}
                        </Text>
                        <Text size={20} fw={500} mt="xl">
                            {order?.user_address?.state} {" "}
                            {order?.user_address?.city} {" "}
                            {order?.user_address?.address} {" "}
                            {order?.user_address?.locality} {" "}
                            {order?.user_address?.landmark} {" "}
                            {order?.user_address?.pincode} {" "}
                        </Text>
                        <Text size={25} fw={500} mt="xl">Phone Number</Text>
                        <strong>
                            {order?.user_address?.phone_number} {" "}
                        </strong>


                    </Grid.Col>
                    <Grid.Col span={3}
                        style={{
                            borderRight: "1px solid #e0e0e0"
                        }}
                    >
                        <Text size={30} fw={500} mt="xl">Your reward </Text>
                    </Grid.Col>
                    <Grid.Col span={3}
                        style={{
                            borderRight: "1px solid #e0e0e0"
                        }}
                    >
                        <Text size={30} fw={500} mt="xl">More Actions</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                    <Text size={30} fw={500} mt="xl">Download</Text>
        <div className="delivery-address mt-6">
              <ActionIcon variant="transparent"><IconFileTypePdf size="10rem" style={{ marginRight: '8px'}}/></ActionIcon>
              <Text size="xlg" fz="xlg" weight={500}>Invoice</Text>
                <Button style={{
                  backgroundColor:'#d10024',
                  marginLeft:'5rem',
                  height: '2.5rem',
                  paddingLeft: '4rem',
                  paddingRight: '4rem',
                }}
               
                >Download</Button>
            </div>

                    </Grid.Col>
                </Grid>
            </Card>
            {/*  */}
            <Card padding="lg" shadow="sm" mt={40}>
                <Grid gutter="lg">
                    <Grid.Col span={2}
                        style={{
                            borderRight: "1px solid #e0e0e0"
                        }}
                    >
                        <Group position="apart" mt="xl">
                            <Image src={product?.image} alt={product?.name} width={100} height={100} />
                            <div>
                                <p>
                                    {product?.name}<br />
                                    {product?.selected_color}<br />
                                    {product?.selected_size}<br />
                                    ₹{product?.price}
                                </p>
                            </div>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={6}
                        style={{
                            borderRight: "1px solid #e0e0e0"
                        }}
                    >
                        <Timeline active={active_count} color="blue" bulletSize={34} lineWidth={4}>
                            <Timeline.Item bullet={<IconGitBranch size={12} />} title="Order Confirmed">
                                <Text size="xl" mt={4}>
                                    {
                                        dayjs(order?.created_at).format('DD MMM YYYY')}
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item bullet={<IconGitCommit size={12} />} title="Shipped">
                                <Text size="xl" mt={4}>
                                    {
                                        order.shipped_date ? dayjs(order?.shipped_date).format('DD MMM YYYY') : "Not Yet Shipped "
                                    }
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item title="Out for delivery" bullet={<IconGitPullRequest size={12} />} lineVariant="Out for Delivery">
                                <Text size="xl" mt={4}>
                                    {
                                        order.out_for_delivery_date ? dayjs(order?.out_for_delivery_date).format('DD MMM YYYY') : 'Not yet out for delivery'
                                    }
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item title="Delivered" bullet={<IconMessageDots size={12} />}>
                                <Text size="xl" mt={4}>
                                    {
                                        order.delivered_date ? dayjs(order?.delivered_date).format('DD MMM YYYY') : 'Not yet delivered'
                                    }
                                </Text>
                            </Timeline.Item>
                        </Timeline>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Text size={35} fw={500} mt="xl">
                            Download
                        </Text>

                    </Grid.Col>
                </Grid>
            </Card>
        </div>
    )
}

export default OrderProductSummary