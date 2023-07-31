import React, { useState, useEffect } from 'react'
import { Group, Card, Text, Radio } from '@mantine/core'
import { IconCheckbox } from '@tabler/icons-react'

function PaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
    const [showPaymentMethod, setShowPaymentMethod] = useState(false)
    return (
        <Card shadow="sm" padding="md" radius="md" className="payment-method">
            <div className="payment-method">

                <Card.Section>
                    <Group>
                    <Text m="xl" size={30} weight={700}>4. Payment Method</Text>
                    {
                        !showPaymentMethod && (
                                <IconCheckbox size={30} onClick={() => setShowPaymentMethod(true)} />
                        )
                    }
                    </Group>
                </Card.Section>
               {
                showPaymentMethod && (
                        <Radio.Group
                            value={paymentMethod}
                            onChange={setPaymentMethod}
                            name="Payment Method"
                            label="Payment Method"
                            size="xl"
                        >
                            <Group mt="xs">
                                <Radio value="Cash on Delivery" size="lg" />
                                <Text>Cash on Delivery</Text>
                            </Group>
                            <Group mt="xs">
                                <Radio value="UPI" size="lg" disabled />
                                <Text>
                                    Online Payment
                                </Text>
                            </Group>
                        </Radio.Group>
                )
               }

            </div>

        </Card>
    )
}

export default PaymentMethod