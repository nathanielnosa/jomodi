import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Text, Group, Badge, Button, UnstyledButton } from '@mantine/core'
import { API_URL } from '../constants';

function AddtoCartPopUp({ product, selectedColor, selectedSize, setSelectedColor, setSelectedSize,
    errorColor, errorSize, openModal, handleCloseModal,
    addtoCart
}) {

    const [colorImage, setColorImage] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}product/colorimage_fetch/?product_id=${product?.id}`)
            .then((res) => {
                console.log("image", res.data.results);
                setColorImage(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [product?.id]);

    return (
        <Modal opened={openModal} onClose={handleCloseModal}>
            <Text variant="label" size="lg" style={{ fontWeight: 'bold' }}>
                select size and color
            </Text>
            <div className="product-options">
                {
                    product?.show_size && (
                        <Group variant="filled" mb="sm" mt="xs" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Text variant="label" style={{ marginRight: '10px' }}>Size
                            </Text>
                            {
                                (product?.size?.map((siz, index) => (
                                    <Badge
                                        key={index}
                                        variant={
                                            selectedSize == siz.size ? 'dot' : 'light'
                                        }
                                        radius="xl"
                                        size="xl"

                                        onClick={() => setSelectedSize(siz.size)}
                                        style={{
                                            fontWeight: selectedSize == siz.size ? 'bold' : 'normal',
                                            fontSize: selectedSize == siz.size ? '10px' : '15px',
                                            borderRadius: '50%',
                                            height: '50px',
                                            width: '50px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {siz.size}
                                    </Badge>
                                )))
                            }
                        </Group>
                    )
                }
                {
                    (product?.show_size && errorSize) && (
                        <Text variant="label" color="red" size="sm" style={{ fontWeight: 'bold' }}>
                            Please select a size
                        </Text>
                    )
                }
                {
                    selectedSize && (
                        <Text variant="label" size="lg" style={{ fontWeight: 'bold' }}>
                            Selected Size: {selectedSize}
                        </Text>
                    )
                }
                {
                    product?.show_color && (
                        <Group variant="filled" mb="sm" mt="xs" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Text variant="label" style={{ marginRight: '10px' }}>
                                Color
                            </Text>
                            {
                                product?.color?.map((color, index) => (
                                    <Badge
                                        key={index}
                                        radius="xl"
                                        size="xl"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: color.color,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setSelectedColor(color.color)}
                                    ></Badge>
                                ))
                            }
                        </Group>
                    )
                }
                {
                    selectedColor && (
                        <Text variant="label" size="lg" style={{ fontWeight: 'bold' }}>
                            Selected Color: {selectedColor.toLocaleUpperCase()}
                        </Text>
                    )
                }
                {
                    (product?.show_color && errorColor) && (
                        <Text variant="label" color="red" size="sm" style={{ fontWeight: 'bold' }}>
                            Please select a color
                        </Text>
                    )
                }
            </div>
            <Group position='right'>
              <button className='btn btn-warning'
              onClick={addtoCart}
              >
                Done
              </button>
            </Group>
        </Modal>
    )
}
export default AddtoCartPopUp