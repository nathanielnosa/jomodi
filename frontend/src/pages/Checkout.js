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
import RemoveFromCartModal from '../components/RemoveFromCartModal';


function Checkout() {
    const navigate = useNavigate();
    const { login, logout, user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("razor-pay");
    const [addresses, setAddresses] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [showOrder, setShowOrder] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [couponID, setCouponID] = useState(null);
    const [couponUsers, setCouponUsers] = useState([]);
    const [numberAvailable, setNumberAvailable] = useState(0);
    const [orderID, setOrderID] = useState(null);

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


    const cartDiscount = cartItems.reduce(
        (total, item) => total + item.quantity * item.cancel_price,
        0
    );
    const productIds = cartItems?.map((item) => item.id);

    useEffect(() => {
        // Get the coupon code axios
        axios
            .get(`${API_URL}order/coupon/${couponID}`)
            .then((res) => {
                console.log(res.data);
                setCouponUsers(res.data[0].users);
                setNumberAvailable(res.data[0].number_available);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [couponCode]);

    function loadRazorpayScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    async function displayRazorpayPaymentSdk(order) {
        const res = await loadRazorpayScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. please check are you online?");
            return;
        }

        // creating a new order and sending order ID to backend
        const result = await axios.post(API_URL + "order/razorpay_order", {
            "order_id": order,
            'amount': cartTotal,
            'name': 'Jomodi',
            'user': user?.user_id,

        });

        if (!result) {
            alert("Server error. please check are you onlin?");
            return;
        }

        // Getting the order details back
        const { merchantId = null, amount = null, currency = null, orderId = null } = result.data;

        const options = {
            key: "rzp_test_no6wvyoP4nQF2v",
            amount: amount.toString(),
            currency: currency,
            name: "Jomodi",
            description: "Test Transaction",
            order_id: orderId,
            image: "https://jomodi.com/img/jomo.jpg",
            callback_url: API_URL + "order/razorpay_callback",
            redirect: true,
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            notes: {
                address: "None",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        return result;
    }


    const handleSubmit = async (e) => {

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
                shipped: false,
                delivered: false,
                out_for_delivery: false,
                returned: false,
                shipped_date: null,
                delivered_date: null,
                out_for_delivery_date: null,
                payment_method: paymentMethod,
                discount: cartDiscount,
                order_id: "ORD" + Math.floor(Math.random() * 1000000000),
                order_data: cartItems,
                coupon: couponCode,
                status: "Shipping in Progress",
                products: cartItems,
                user: user?.user_id,
                // address: deliveryAddress,
            };
            await axios
                .post(`${API_URL}order/order/`, details)
                .then((res) => {
                    console.log(res.data);
                    const productID = res.data.products.map((item) => {
                        return {
                            id: item.id,
                            available_quantity: item.available_quantity,
                        };
                    });
                    productID?.map((product) => {
                        axios
                            .patch(`${API_URL}product/product/${product.id}/`, {
                                available_quantity: product.available_quantity - cartItems.find((item) => item.id == product.id).quantity,
                            })
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                    setOrderID(res.data.id);
                    if (res.data.payment_method == 'razor-pay') {
                        displayRazorpayPaymentSdk(res.data.id)
                    }
                    else {
                        navigate("/order-success");
                        handleRemoveItems();
                    }

                    axios.patch(`${API_URL}order/coupon/${couponID}/`, {
                        users: [...couponUsers, user?.user_id],
                        number_available: numberAvailable - 1

                    })
                        .then((patchRes) => {
                            console.log("Coupon updated:", patchRes.data);
                        })
                        .catch((patchErr) => {
                            console.log("Error updating coupon:", patchErr);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });

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
                                    setPaymentMethod={setPaymentMethod}
                                    paymentMethod={paymentMethod}
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
                            <OrderDetail
                                cartTotal={cartTotal}
                                setCartTotal={setCartTotal}
                                couponCode={couponCode}
                                setCouponCode={setCouponCode}
                                setCouponID={setCouponID}
                            />

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
                                            backgroundColor: "#d10024",
                                        }}
                                        onClick={handleSubmit}
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

                </div>
            </div>
        </>
    );
}

export default Checkout;
