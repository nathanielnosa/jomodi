import { Card, Group, SimpleGrid, Text, Button, Image, UnstyledButton, TextInput, NumberInput, Loader } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { removeCartItems } from "../actions/cartActions";
import { registerUser } from '../actions/auth'
import UserCard from "../components/checkout/UserCard";
import AddressCard from "../components/checkout/AddressCard";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderDetail from "../components/checkout/OrderDetail";
import { notifications } from "@mantine/notifications";

function Checkout() {
    const navigate = useNavigate();
    const { login, logout, user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [showOrder, setShowOrder] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const dispatch = useDispatch();

    const handleRemoveItems = () => {
        // Call this function when you want to remove the items from the store
        dispatch(removeCartItems());
    };

    useEffect(() => {
        // Get cart items from local storage
        const existingCartItems =
            JSON.parse(localStorage.getItem("cartItems")) || [];
        const buyCartItem = existingCartItems.filter((item) => item.buy === true);
        setCartItems(
            buyCartItem.map((item) => ({
                ...item,
                status: "Active", // Set initial status to 'Active'
                cancel: false, // Set initial cancel value to false
            }))
        );
    }, []);
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );
    const cartDiscount = cartItems.reduce(
        (total, item) => total + item.quantity * item.cancel_price,
        0
    );
    const productIds = cartItems?.map((item) => item.id);

    const handleSubmit = (e) => {

        e.preventDefault();
        if (deliveryAddress == null) {
            notifications.show({
                title: 'Please Select Delivery Address',
                message: 'Please Select a delivery address! 🤥',
                styles: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.red[6],
                        borderColor: theme.colors.red[6],
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
        }
        if (deliveryAddress !== null) {
            const details = {
                user_address: deliveryAddress,
                paid: false,
                total: cartTotal,
                cancel: false,
                payment_method: 'Payment on delivery',
                discount: cartDiscount,
                order_id: "ORD" + Math.floor(Math.random() * 1000000000),
                order_data: cartItems,
                status: "Shipping in Progress",
                products: cartItems,
                user: user?.user_id,
                // address: deliveryAddress,
            };
            console.log(details);

            axios
                .post(`${API_URL}order/order/`, details)
                .then((res) => {
                    console.log(res.data);
                    handleRemoveItems();
                    navigate("/order-success");
                })
                .catch((err) => console.log(err));
        }
    };


    return (
        <>
            <div id="breadcrumb" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="breadcrumb-header">Checkout</h3>
                            <ul className="breadcrumb-tree">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li className="active">Checkout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-7">
                                <SimpleGrid cols={1} spacing="md">
                                    <UserCard />
                                    <AddressCard
                                        deliveryAddress={deliveryAddress}
                                        setDeliveryAddress={setDeliveryAddress}
                                        setShowOrder={setShowOrder}
                                    />
                                    <OrderSummary
                                        deliveyAddress={deliveryAddress}
                                        showOrder={showOrder}
                                        showPayment={setShowPayment}
                                    />
                                    <PaymentMethod 
                                    showPayment={showPayment}
                                    />

                                </SimpleGrid>
                            </div>

                            <div className="col-md-5 order-details"
                                style={{
                                    position: "sticky",
                                    top: 100,
                                }}
                            >
                                <div className="section-title text-center">
                                    <h3 className="title">Your Order</h3>
                                </div>
                                <OrderDetail />

                                <div className="input-checkbox">
                                    <input type="checkbox" id="terms" checked={true} required />
                                    <label htmlFor="terms">
                                        <span></span>
                                        I've read and accept the{" "}
                                        <Link to="/terms-and-conditions" target="_blank">
                                            {" "}
                                            terms & conditions
                                        </Link>
                                    </label>
                                </div>
                                {
                                    user && (
                                        cartItems.length > 0 && (<button
                                            className="primary-btn order-submit"
                                            style={{
                                                width: "100%",
                                                color: "white",
                                                backgroundColor: "red",
                                            }}
                                            type="submit"
                                        >
                                            Place order
                                        </button>
                                    )
                                    )
                                }
                                {
                                    cartItems.length === 0 && (
                                        <Link to="/store" className="primary-btn order-submit"
                                        style={{
                                            textDecoration: "none",
                                            backgroundColor: "orange",
                                        }}
                                        >
                                            Shop Now For Products
                                        </Link>
                                    )
                                }

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Checkout;
