import React from 'react'
import { Modal, Button, Text, Title, Center, Group, Image, UnstyledButton, Divider } from '@mantine/core'

function RemoveFromCartModal({ handleRemove, handleClose, showModal, selectedProduct, text }) {
    return (
        <Modal opened={showModal} onClose={handleClose} size="30%">
       
              
                <div
                style={{
                    display: "flex",
                }}
                >
                <Image src={selectedProduct?.image} width={90} height={90} />
                   <div style={{ marginLeft: "1rem" }}>
                    <Title order={3} style={{ marginBottom: "0" }}>
                        Move from {text}
                    </Title>
                    <Text size="lg">
                        Are you sure you want to remove this item from {text}?
                    </Text>
                    </div>
                </div>

                <Divider style={{ margin: "1rem 0" }} />
                <Group position="apart">
             
                <UnstyledButton
                    variant="outline"
                    color="red"
                    size="lg"
                    radius="xl"
                    mb="md"
                    style={{ marginLeft: "9rem" }}
                    onClick={handleRemove}
                >
                    <Text size="lg" fw={700}>
                        Remove
                    </Text>
                </UnstyledButton>
                <UnstyledButton
                    variant="outline"
                    color="teal"
                    size="lg"
                    radius="xl"
                    mb="md"
                    style={{ marginRight: "9rem" }}
                    onClick={handleClose}
                >
                    <Text color="red" size="lg" fw={700}>
                        Move to {text}
                    </Text>
                </UnstyledButton>
            </Group>

        </Modal>
    )
}

export default RemoveFromCartModal