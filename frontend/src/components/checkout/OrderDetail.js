import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishActions';
import { Button, Divider, Group, Input } from '@mantine/core';
import { UnstyledButton, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { updateCartItemQuantity } from '../../actions/cartActions';
import dayjs from 'dayjs';

function OrderDetail() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
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
