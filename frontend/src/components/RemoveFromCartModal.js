import React from 'react'
import { Modal, Button, Text, Title, Center } from '@mantine/core'

function RemoveFromCartModal({handleRemove, handleClose, showModal, selectedProduct, text}) {
  return (
      <Modal opened={showModal} onClose={handleClose} size="40%">
          <Center>
              <Title order={2} m="lg">Are you sure you want to remove from {text}?</Title>
          </Center>
          <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                  variant="outline"
                  color="red"
                  size="lg"
                  radius="xl"
                  mb="md"
                  style={{ marginRight: "1rem" }}
                  onClick={handleRemove}
              >
                  Yes
              </Button>
              <Button
                  variant="outline"
                  color="teal"
                  size="lg"
                  radius="xl"
                  mb="md"
                  style={{ marginRight: "1rem" }}
                  onClick={handleClose}
              >
                  No
              </Button>
          </div>

      </Modal>
  )
}

export default RemoveFromCartModal