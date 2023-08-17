import React, { useEffect, useState } from "react";
import { IconPinnedFilled, IconSettings, IconJewishStarFilled, IconHelpSquareFilled } from '@tabler/icons-react';
import { IconPdf } from "@tabler/icons-react";
import { IconFileTypePdf } from "@tabler/icons-react";
import {
  Card,
  CardSection,
  Text,
  Stack,
  Badge,
  ActionIcon,
  Group,
  Container,
  Image,
  Button,
  Pagination,
  Modal,
  Box,
  Grid,
  Title,
  Center,
  Progress
} from "@mantine/core";
import axios from "axios";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const orderStatuses = [
  { value: 0, label: 'Order Confirmed' },
  { value: 50, label: 'Order Shipped' },
  { value: 70, label: 'Out for Delivery' },
  { value: 100, label: 'Delivered' },
];
function OrderDetailPage() {
  // Define your state variables and fetch order data here
  const currentStatus = 70;
 

  return (
   
    <Container maxWidth="lg" className="custom-container">
      <Card shadow="sm" padding="lg" radius="md" withBorder>

      <Grid>
      <Grid.Col sm={12} md={4}>
        <Text size="xlg" fz="xlg" weight={500} >Delivery Address </Text>
        <Text>Satyajit Barik</Text>
        <p>N0 23 address, Metropleis, India, Bangladore</p>

        <div className="mt-4">
        <Text size="xlg" fz="xlg" weight={500} >Phone number </Text>
        <Text>+91 6353 736 3</Text>
        </div>
        <p></p>
        
      </Grid.Col>
      <Grid.Col sm={0} md={1} className="vertical-line-col">
      <div className="vertical-line"></div>
      </Grid.Col>
      <Grid.Col md={3}>
      <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">1222528743</span></p>
                <p className="text-muted mb-0"> Placed On <span className="fw-bold text-body">12,March 2019</span> </p>
              </div>
              <div className="">
                <Button style={{backgroundColor:'#d10024'}}>View More</Button>
              </div>
            </div>
      </Grid.Col>
      <Grid.Col sm={0} md={1} className="vertical-line-col">
      <div className="vertical-line"></div>
      </Grid.Col>
    <Container size="" className="custom-container"/>
      
      <Grid.Col sm={12} md={3}>
        <Text size="xlg" fz="xlg" weight={500}>More Actions</Text>
        <div className="delivery-address mt-3">
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

      <Grid.Col md={12}>
      


      </Grid.Col>
      
    </Grid>

        
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
        <Grid>
          <Grid.Col md={4}>
            <section className="vh-100 gradient-custom-2">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-10 col-lg-8 col-xl-6">
        <div className="card card-stepper" style={{ borderRadius: '16px' }}>
          <div className="card-header p-4">
            <div className="d-flex justify-content-between align-items-center">
              
              
            </div>
          </div>
          <div className="card-body p-4">
            <div className="d-flex flex-row mb-4 pb-2">

              <div>
                <img className="align-self-center img-fluid"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp" width="250" alt="Product" />
              </div>
            </div>
            
          </div>
          <div className="card-footer p-4">
          
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


          </Grid.Col>
          <Grid.Col md={4}>
          <div className=" mt-10" style={{marginTop:'7rem'}}>
                <h5 className="bold">Headphones Bose 35 II</h5>
                <p className="text-muted"> Qt: 1 item</p>
                <h4 className="mb-3"> $ 299 <span className="small text-muted"> via (COD) </span></h4>
                <p className="text-muted">Tracking Status on: <span className="text-body">11:30pm, Today</span></p>
              </div>

          </Grid.Col>
          <Grid.Col md={4}>
            <div style={{marginTop:'7rem'}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
  <IconJewishStarFilled style={{color:'#d10024'}}/>
  <span>
    <Link style={{ color: 'blue', marginLeft: '5px' }}>Rate & Review Product</Link>
  </span>
</div>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <IconHelpSquareFilled style={{color:'#d10024'}} />
  <span>
    <Link style={{ color: 'blue', marginLeft: '5px' }}>Need help?</Link>
  </span>
</div>

            


            </div>

          </Grid.Col>
          
        </Grid>

        <Grid>
        <Grid.Col md={2}>
                Order confirmed
          </Grid.Col>
          <Grid.Col md={2}>
                Shipped
          </Grid.Col>
          <Grid.Col md={2}>
                Out of delivery
          </Grid.Col>
          <Grid.Col md={2}>
                Delivered
          </Grid.Col>
          <Grid.Col xs={12} md={12}>
      
          <div class="tracking-progress-bar">
		<div class="tracking-progress-bar__item tracking-progress-bar__item--first tracking-progress-bar__item--active">1</div>

		<span class="tracking-progress-bar__item__bar tracking-progress-bar__item__bar--active"></span>
		<div class="tracking-progress-bar__item tracking-progress-bar__item--active">2</div>

		<span class="tracking-progress-bar__item__bar"></span>
		<div class="tracking-progress-bar__item">3</div>

		<span class="tracking-progress-bar__item__bar"></span>
		<div class="tracking-progress-bar__item">4</div>

		
</div>



          </Grid.Col>
        </Grid>

      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
                <Grid>
                  <Grid.Col sm={12} className="mt-4">
                    <Text weight={500} size={25}>Rate your experence</Text>

                    <div className="mt-4">
                      <a><p>How was your delivery experence?</p></a>
                    </div>


                  </Grid.Col>
                </Grid>
      </Card>
    </Container>
    
  );
}

export default OrderDetailPage;
