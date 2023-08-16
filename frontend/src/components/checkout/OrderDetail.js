import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishActions';
import { Button, Divider, Group, Input, TextInput } from '@mantine/core';
import { UnstyledButton, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { updateCartItemQuantity } from '../../actions/cartActions';
import { useAuth } from "../../context/auth-context";
import axios from 'axios';
import { API_URL } from '../../constants';
import dayjs from 'dayjs';

function OrderDetail({cartTotal, setCartTotal, couponCode, setCouponCode,setCouponID
}) {
    const { login, logout, user } = useAuth();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    const [applyCoupon, setApplyCoupon] = useState(false)
    const [couponError, setCouponError] = useState(false)
    const [couponSuccess, setCouponSuccess] = useState(false)
    const [couponApplied, setCouponApplied] = useState(false)
    const [couponAmountError, setCouponAmountError] = useState(false)
    const [coupon, setCoupon] = useState(null)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        // Update cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleRemoveFromCart = (index) => {
        dispatch(removeFromCart(index));
    };

    const cartQuantity = cartItems.filter((item) => item.buy).length;
    // const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    // const cartDiscount = cartItems.reduce((total, item) => total + item.quantity * item.cancel_price, 0);

    // const cartTotal = cartItems.reduce((total, item) => {
    //     if (item.buy) {
    //         return total + item.quantity * item.price;
    //     }
    //     return total;
    // }, 0);

    useEffect(() => {
        // Calculate cart total whenever cartItems change
        const calculatedTotal = cartItems.reduce((total, item) => {
            if (item.buy) {
                return total + item.quantity * item.price;
            }
            return total;
        }, 0);

        setCartTotal(calculatedTotal);
    }, [cartItems]);


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

    const handleCouponSubmit = (coupon) => {
        axios.get(`${API_URL}order/fetch-coupon/?coupon=${coupon}&user_id=${user?.user_id}`)
            .then(res => {
                console.log(res.data.results);
                if (res.data.results.length > 0) {
                    const coupon_res = res.data.results[0];
                    setCoupon(coupon_res);
                    setCouponID(coupon_res?.id);
                    // Perform additional checks on the coupon price and discounted price
                    const couponPrice = coupon_res?.discount;
                    // const discountedPrice = calculateDiscountedPrice(); // You should replace this with your own logic to calculate discounted price
                    const priceDifference = cartTotal - couponPrice;
                    if (priceDifference >= 0 && cartTotal / couponPrice >= 5) {
                        setCartTotal(priceDifference)
                        setCouponApplied(true)
                        setApplyCoupon(false)
                        setCouponSuccess(true);
                        setCouponError(false);
                    } else {
                        setCouponAmountError(true);
                        setCouponSuccess(false);
                        setInterval(() => {
                            setCouponAmountError(false);
                        }
                            , 5000)

                    }
                } else {
                    setCouponError(true);
                    setCouponSuccess(false);
                }
            })
            .catch(err => {
                console.log(err);
                setCouponError(true);
                setCouponSuccess(false);
            });
    };


    const getDeliveryDate = () => {
        const today = dayjs();
        const deliveryDate = today.add(7, 'day');

        // Format the delivery date as "DD/MM/YYYY"
        const formattedDeliveryDate = deliveryDate.format('DD-MMMM-YYYY');
        return formattedDeliveryDate;
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
        <div className="mt-5">
            {
                couponApplied == false && (

                    applyCoupon ?
                        (
                            <div>
                                <Group position="left">
                                    <TextInput
                                        size='xl'
                                        placeholder='Coupon Code'
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <Button size='xl'
                                        mt="mt"
                                        color="blue"
                                        onClick={() => handleCouponSubmit(couponCode)}
                                        style={{
                                            backgroundColor: 'blue'
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Group>
                                {
                                    couponSuccess && (
                                        <Text color="green" size='lg'>
                                            Coupon Code is Active
                                        </Text>
                                    )

                                }
                                {
                                    couponAmountError && (
                                        <Text color="red" size='lg'>
                                            Total Amount should be greater than 5 times of Coupon Amount
                                        </Text>
                                    )

                                }
                                {
                                    couponError && (
                                        <Text color="red" size='lg'>
                                            Coupon Code is Inactive
                                        </Text>
                                    )
                                }
                            </div>
                        ) : (
                            <Button size='xl'
                                color="blue"
                                onClick={() => setApplyCoupon(true)}
                                style={{
                                    backgroundColor: 'blue'
                                }}
                            >
                                Apply Coupon
                            </Button>
                        )
                )
            }
            {
                couponApplied && (
                    <Button
                        size='xl'
                        color="blue"
                        style={{
                            backgroundColor: 'red'
                        }}
                    >
                        Coupon Applied
                    </Button>
                )
            }
            <div className="order-summary">
                <div className="order-col">
                    <div>
                        <strong>PRODUCT</strong>
                    </div>
                    <div>
                        <strong>TOTAL</strong>
                    </div>
                </div>
                <div className="order-products">
                    {(cartItems.filter(item => item.buy)).map((item, index) => (
                        <div className="order-col" key={index}>
                            <div>
                                {item.quantity}x {item.name}
                            </div>
                            <div>₹{(item.quantity * item.price).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <div className="order-col">
                    <div>Shipping</div>
                    <div>
                        <strong>FREE</strong>
                    </div>
                </div>
                <div className="order-col">
                    <div>
                        <strong>TOTAL</strong>
                    </div>
                    <div>
                        <strong className="order-total">
                            ₹{cartTotal.toFixed(2)}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
