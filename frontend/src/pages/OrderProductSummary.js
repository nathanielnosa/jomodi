import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Card, Grid, Text, Image, Group, Timeline, TimelineItem, ActionIcon, Button, Stepper, StepperProps, rem } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots, IconJewishStarFilled, IconHelpSquareFilled  } from '@tabler/icons-react';
import { BsFileEarmarkText } from 'react-icons/bs'
import dayjs from 'dayjs';



function OrderProductSummary() {
    const location = useLocation();
    const { order, product } = location.state;

    const active_count = order.shipped_date ? 2 : order.out_for_delivery_date ? 3 : order.delivered_date ? 4 : 1;

    return (
        <div>
            <Grid mx={60}>
            <Grid.Col span={12}>
                        
                        <nav class="flex" aria-label="Breadcrumb">
                          <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                              <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                <Text size={20} weight={400}>Home</Text>
                              </a>
                            </li>
                            <li>
                              <div class="flex items-center">
                                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <a href="/profile" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"> <Text size={20} weight={400}>My Account</Text></a>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center">
                                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <a href="/order" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"> <Text size={20} weight={400}>My Orders</Text></a>
                              </div>
                            </li>
                            <li aria-current="page">
                              <div class="flex items-center">
                                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"> <Text size={20} weight={400}>{product.id}</Text></span>
                              </div>
                            </li>
                          </ol>
                        </nav>
                        
                        
                                            </Grid.Col>
            </Grid>
            
            <Card padding="lg" shadow="sm" mx={60} mt={20}>
                <Grid gutter="lg">
                    
                    <Grid.Col span={6}
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
                   
                    <Grid.Col span={6} className='pl-3'>
                    <Text size={30} fw={500} mt="xl">More Actions</Text>
                    <div className="delivery-address mt-10">
  <div className="flex items-center rounded-lg bg-[#d10024] p-3">
    <BsFileEarmarkText size="2rem" style={{ width: '2rem' }} color='white' />
  </div>
  <Text size={25} fz="xlg" weight={500} className='ml-5'>
    Download Invoice
  </Text>
  <Button
    style={{
      backgroundColor: '#d10024',
      marginLeft: '20rem',
      height: '2.5rem',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    }}
  >
    Download
  </Button>
</div>



                    </Grid.Col>
                </Grid>
            </Card>
       
            {/*  */}
            <Card padding="lg" shadow="sm" mt={40} mx={60}>
                <Grid gutter="lg">
                <Grid.Col span={3} style={{ borderRight: "1px solid #e0e0e0" }}>
  <Group position="apart" mt="xl">
    
  </Group>
        <div style={{marginTop:'0rem', marginLeft:''}}>
        <div style={{ display: 'flex',  }}>
        <Image src={product?.image} alt={product?.name} width={160} height={160} />
        <span>
        <div className="ml-4 mt-3">
        <p>
          {product?.name}<br />
          {product?.selected_color}<br />
          {product?.selected_size}<br />
          QTY:{product?.quantity}<br/>
          
        </p>
        <p className='mt-5'>
          ₹{product?.price}<br />

        </p>
        

      </div>
        </span>

        </div>
        </div>
</Grid.Col>


                    <Grid.Col span={4} className='hidden'
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
                    <Grid.Col span={6} style={{
                            borderRight: "1px solid #e0e0e0"
                        }}>
                    <ul className="steps steps-vertical lg:steps-horizontal" style={{width:'100%'}} color='red'>
                        <li data-content='' className="step step-success">
                            <Text size={20} mt={0} weight={500} style={{color:'green'}}>
                                    Order Confirmed
                                </Text>
                                        <Text size="xl" mt={4}>
                                                
                                            {
                                                dayjs(order?.created_at).format('DD MMM YYYY')}
                                        </Text>
                    </li>
                    <li data-content='' className="step step-success">{order.shipped_date?(<div>
                        <Text size={20} mt={0} weight={500} style={{color:'green'}}>
                                                       Shipped
                                                    </Text><Text size="xl" mt={4}>
                                                        {order.shipped_date}
                                                    </Text>
                    </div>): <Text size={20} mt={0} weight={500}>
                                                        Not yet Shipped
                                                    </Text>}</li>
                    {order.out_for_delivery_date?(<li data-content='' className="step step-success"><Text size={20} mt={0} weight={500} style={{color:'green'}}>
                                                        Out for delivery
                                </Text><Text size="xl" mt={4}>
                                                        {order.out_for_delivery_date}
                                </Text></li>):<li data-content='' className="step"><Text size={20} mt={0} weight={500}>
                                    Not yet out for delivery
                                </Text></li>}
                                
                                {order.delivered_date?(<li data-content=''  className="step step-success">
                                    <div>
                                    <Text size={20} mt={4} weight={500} style={{color:'green'}}>
                                    Delivered
                                </Text>
                                <Text size={20} mt={4} weight={500}>
                                    {order.delivered_date}
                                </Text>
                                    </div>
                                </li>):<li data-content='' className="step"><Text size={20} mt={0} weight={500}>
                                    Not yet delivered
                                </Text></li>}
                    </ul>

                    </Grid.Col>

                    <Grid.Col span={3}>
                    <div style={{marginTop:'0rem', marginLeft:'3rem'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconJewishStarFilled style={{color:'#d10024'}}/>
                <span>
                    <Link style={{ color: 'blue', marginLeft: '.5rem' }}>Rate & Review Product</Link>
                </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }} className='pt-4'>
                <IconHelpSquareFilled style={{color:'#d10024'}} />
                <span>
                    <Link style={{ color: 'blue', marginLeft: '5px' }}>Need help?</Link>
                </span>
                </div>

                            


                            </div>

                        </Grid.Col>
                    
                </Grid>
            </Card>
        </div>
    )
}

export default OrderProductSummary