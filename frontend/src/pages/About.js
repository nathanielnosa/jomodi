import React from 'react';
import { Container, Text, Notification, Paper, Group, Button } from '@mantine/core';

function About() {
    return (
        <Container size="lg">
            <Text align="justify" weight={700} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Jomodi - Your One-Stop Destination for All Your Shopping Needs!
            </Text>
            <Text align="justify" weight={700} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Welcome to Jomodi
            </Text>
            <Text align="justify" style={{ marginBottom: '1.5rem' }}>
                Your ultimate online shopping destination, where convenience meets quality and style. We take pride in curating an extensive collection of products to cater to your diverse needs, ensuring an unparalleled shopping experience from the comfort of your home.
            </Text>

            <Text align="justify" weight={700} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Our Mission:
            </Text>
            <Text align="justify" style={{ marginBottom: '1.5rem' }}>
                At Jomodi, our mission is to redefine the way you shop. We strive to provide our valued customers with a seamless, user-friendly platform, offering an extensive range of top-notch products at competitive prices. Our commitment to excellence and customer satisfaction drives us to deliver nothing but the best.
            </Text>

            <Text align="justify" weight={700} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Join Our Growing Community:
            </Text>
            <Text align="justify" style={{ marginBottom: '1.5rem' }}>
                Become a part of our ever-growing community of satisfied customers. Subscribe to our newsletter and follow us on social media to stay updated with the latest trends, exclusive offers, and exciting promotions. We value your trust and loyalty and are committed to continuously improving your shopping experience.
            </Text>

            <Text align="justify" weight={700} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Shop with Confidence:
            </Text>
            <Text align="justify" style={{ marginBottom: '1.5rem' }}>
                At Jomodi, we believe that shopping should be a delightful experience, and we work tirelessly to make it so. Shop with confidence, knowing that we are dedicated to exceeding your expectations at every turn.
            </Text>

            <Text align="justify" style={{ marginBottom: '1rem' }}>

                We look forward to serving you and being a part of your shopping journey!
            </Text>
            <Text align="center" weight={700} style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Owned by: Biswajit Barik
            </Text>

            <Text align="center" weight={700} style={{ fontSize: '1.2rem' }}>
                Happy Shopping,
                <br />
                The Jomodi Team
            </Text>
        </Container>
    );
}

export default About;
