import React from 'react'
import { Container, Text } from '@mantine/core'

function HelpPage() {
  return (
    <Container size="lg" mt="xl">
          <Text align="center" weight={700} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Help Page summary for Jomodi
        </Text>

          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              Welcome to the Help Page of Jomodi. We understand that navigating an online shopping platform may raise questions or concerns, and we are here to assist you every step of the way. Below, you will find useful resources to address your queries and find solutions to common issues:
            </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              1. Frequently Asked Questions (FAQs):
              Our comprehensive FAQs cover a wide range of topics, including account management, ordering process, payment options, shipping, returns, and more. These frequently asked questions and their detailed answers are designed to provide quick solutions to common inquiries.

          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              2. Contacting Customer Support:
              If you need personalized assistance or have specific questions that are not covered in our FAQs, our dedicated customer support team is ready to help. You can reach out to us via phone, email, or our online chat feature during our business hours.
                <br />
              Contact Details:
              - Email: contact@jomodi.com

          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              3. Order Tracking:
              To track the status of your order, simply log in to your account on our website and navigate to the "Order History" section. There, you will find real-time updates on your recent orders, including shipping details and estimated delivery dates.

          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              4. Returns and Refunds:
              If you need to initiate a return or request a refund, our Returns and Refunds page provides step-by-step instructions to guide you through the process. We have outlined our return policy and eligibility criteria to ensure a smooth and hassle-free return experience.

          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              5. Privacy and Security:
              We take your privacy and data security seriously. Our Privacy Policy outlines how we handle your personal information and ensures that your data is protected. Please review our Privacy Policy to learn more about how we safeguard your information.

          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              6. Terms & Conditions:
              For a clear understanding of our website's terms of use and legal obligations, we recommend reading our comprehensive Terms & Conditions page. It covers important aspects such as user responsibilities, intellectual property rights, and limitations of liability.

          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              We want your shopping experience at Jomodi to be enjoyable and stress-free. Whether you have a question about our products, need help with your order, or require any assistance, our Help Page is designed to provide you with the necessary support. If you can't find the answers you need, don't hesitate to contact our friendly customer support team. We are dedicated to making your shopping journey as seamless as possible.
          </Text>
          <Text align="justify" style={{ marginBottom: '0.5rem' }}>
              Thank you for choosing Jomodi. We look forward to serving you!
          </Text>


    </Container>
  )
}

export default HelpPage