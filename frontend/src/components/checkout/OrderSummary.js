import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishActions';
import { Button, Divider, Group, Input, Card } from '@mantine/core';
import { UnstyledButton, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { updateCartItemQuantity } from '../../actions/cartActions';
import { IconCheckbox, IconPlane, IconPlus } from "@tabler/icons-react";
import RemoveFromCartModal from '../RemoveFromCartModal';


import dayjs from 'dayjs';

function OrderSummary({ deliveyAddress, showOrder, showPayment }) {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [showSummary, setShowSummary] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        // Update cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    const handleOpen = (productId) => {
        setSelectedProduct(productId);
        setShowModal(true);
    };

    const handleClose = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    const handleRemoveFromCart = (index) => {
        dispatch(removeFromCart(index));
        handleClose();
    };

    const cartQuantity = cartItems.filter((item) => item.buy).length;
    // const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    // const cartDiscount = cartItems.reduce((total, item) => total + item.quantity * item.cancel_price, 0);

    const cartTotal = cartItems.reduce((total, item) => {
        if (item.buy) {
            return total + item.quantity * item.price;
        }
        return total;
    }, 0);

    const cartDiscount = cartItems.reduce((total, item) => {
        if (item.buy) {
            return total + item.quantity * item.cancel_price;
        }
        return total;
    }, 0);

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity > 0) {
            const updatedItems = [...cartItems];
            updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
            dispatch(updateCartItemQuantity(index, newQuantity, updatedItems[index].buy)); // Also pass the "buy" option to the updateCartItemQuantity action
        }
    };

    const handleBuyOptionChange = (index, buy) => {
        const updatedItems = [...cartItems];
        updatedItems[index] = { ...updatedItems[index], buy };
        dispatch(updateCartItemQuantity(index, updatedItems[index].quantity, buy)); // Also pass the updated "buy" option to the updateCartItemQuantity action
    };


    const getDeliveryDate = () => {
        const today = dayjs();
        const deliveryDate = today.add(7, 'day');

        // Format the delivery date as "DD/MM/YYYY"
        const formattedDeliveryDate = deliveryDate.format('DD-MMMM-YYYY');
        return formattedDeliveryDate;
    };
    const [selectedSize, setSelectedSize] = useState(''); // State to track selected size

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
        notifications.show({
            title: 'Successfully Added your Wish List',
            message: 'Successfully Added your Wish List! 🤥',
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.green[6],
                    borderColor: theme.colors.green[6],
                    height: '100px',
                    width: 'auto',
                    '&::before': { backgroundColor: theme.white },
                },

                title: { color: theme.white, fontSize: '20px' },
                description: { color: theme.white },
                closeButton: {
                    color: theme.white,
                    '&:hover': { backgroundColor: theme.colors.green[7] },
                },
            }),
        })
    };

    return (
        <Card shadow="sm">
            <Card.Section m="5" p="sm" style={{ backgroundColor: showSummary && showOrder ? "#d10024" : "white" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Text fz={30} weight={700} color={ showSummary && showOrder ? "white" : "black"} style={{ marginRight: "10px" }}>
        3. ORDER SUMMARY {showOrder && `(${cartQuantity} ITEMS)`}
      </Text>
      {!showSummary && (
         <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
         <Text style={{ marginRight: "5px" }}></Text>
         <IconCheckbox size={30} onClick={() => { setShowSummary(true); showPayment(false); }} />
       </div>
      )}
    </div>
  </Card.Section>


            <div className="mt-5">
                <div className="row">
                    <RemoveFromCartModal
                        handleRemove={() => handleRemoveFromCart(selectedProduct)}
                        handleClose={() => handleClose()}
                        showModal={showModal}
                        selectedProduct={selectedProduct}
                        text="Cart"
                    />
                    <div className="col-md-12" style={{
                        backgroundColor: 'white',
                    }}>   
                        {
                            showOrder && (
                            showSummary && (
                                <div className="card mb-3">
                                    {(cartItems.filter(item => item.buy)).map((item, index) => (
                                        <div key={index} className="row no-gutters" style={{
                                            margin: '3px',
                                            padding: '3px',
                                            marginTop: '10px',
                                        }}>
                                            <div className="col-md-2">
                                                <img src={item.image} className="card-img" alt="Product Image"
                                                    style={{
                                                        width: "70px",
                                                        height: "70px",
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <Group position="right">
                                                    <p className="card-title"> Delivery by {getDeliveryDate()} | Free </p>
                                                </Group>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ marginBottom: '10px' }}>
                                                    <Link
                                                        to={`/product/${item.id}/${item.name}`}
                                                        target='_blank'
                                                        style={{
                                                        textDecoration: 'none',
                                                        color: 'black',
                                                        }}
                                                    >
                                                        {item.name.toUpperCase()}
                                                    </Link>
                                                    </h5>
                                                    <Group position="left">
                                                    <del className="product-old-price" style={{ marginBottom: '10px' }}>
                                                        ₹{item?.cancel_price}
                                                    </del>
                                                    <p className="card-title" style={{ marginBottom: '10px' }}>
                                                        ₹{item.price.toFixed(2)}
                                                    </p>
                                                    </Group>
                                                </div>

                                                <div className="row">
                                            <div className="col-md-6">
                                            <div className="card-body">
                                                <h1 className='card-title' style={{ marginBottom: '5px' }}>Description</h1>
                                                <p style={{ marginTop: '0', marginBottom: '0' }}>{item.description}</p>
                                            </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="card-body">
                                                <h1 className='card-title' style={{ marginBottom: '5px' }}>Size</h1>
                                                <select
                                                className="form-select" // Apply styling classes here
                                                value={selectedSize}
                                                onChange={(e) => handleSizeChange(e.target.value)}
                                                >
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                                {/* Add more size options as needed */}
                                                </select>
                                            </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="card-body">
                                               <h1 className='card-title' style={{ marginBottom: '5px' }}>Color</h1>
                                                <p style={{ marginTop: '0', marginBottom: '0' }}>{'red'}</p>
                                            </div>
                                            </div>
                                        </div>
                                                </div>

                                            <div className="col-md-12">
                                                <Group position="left">
                                                    <div className="qty-label">
                                                        <UnstyledButton>
                                                            <Group position='left'>
                                                                <Button radius="xl" size="md"
                                                                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                                    variant="outline" color="red"
                                                                >
                                                                    - </Button>
                                                                <input
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '24px',
                                                                        border: '1px solid #ccc',
                                                                        fontSize: '14px',
                                                                        textAlign: 'center',
                                                                        margin: '0 5px',
                                                                    }}
                                                                />
                                                                <Button radius="xl" size="md" onClick={() => handleQuantityChange(index, item.quantity + 1)} variant="outline" color="red">
                                                                    + </Button>
                                                            </Group>
                                                        </UnstyledButton>
                                                    </div>
                                                    <Group mx="xl">
                                                        <UnstyledButton onClick={() => {
                                                            handleAddToWishlist(index);
                                                            handleRemoveFromCart(index)
                                                        }}>
                                                            <Text weight={700} size="xl">
                                                                Save for later
                                                            </Text>
                                                        </UnstyledButton>
                                                        <UnstyledButton onClick={() => handleOpen(item.id)}>
                                                            <Text weight={700} size="xl">
                                                                Remove
                                                            </Text>
                                                        </UnstyledButton>
                                                    </Group>
                                                </Group>
                                                <Divider style={{
                                                    marginTop: '10px'
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                    <Group position="right" style={{
                                        background: "white",
                                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                                        padding: "10px",
                                        marginTop: "10px",
                                    }}>
                                       {
                                        cartItems.length > 0 ? (
                                                    <Link to="/checkout" style={{
                                                        textDecoration: 'none',
                                                    }}>
                                                        <button className="btn btn-warning btn-block btn-lg"
                                                            onClick={() => {
                                                                setShowSummary(false);
                                                                showPayment(true)
                                                            }}
                                                        >
                                                            Continue <i className="fa fa-arrow-circle-right"></i>
                                                        </button> </Link>
                                        ) :
                                        (
                                                        <Link to="/" style={{
                                                            textDecoration: 'none',
                                                        }}>
                                                            <button className="btn btn-warning btn-block btn-lg"
                                                                onClick={() => {
                                                                    setShowSummary(false);
                                                                    showPayment(true)
                                                                }}
                                                            >
                                                            No Product, Continue Shopping <i className="fa fa-arrow-circle-right"></i>
                                                            </button> </Link>
                                        )
                                       }
                                    </Group>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default OrderSummary;