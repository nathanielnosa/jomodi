import { Group } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

function WishListCheckOut() {
    const [wishItems, setWishItems] = useState([]);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [telephone, setTelephone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');



    useEffect(() => {
        // Get cart items from local storage
        const existingWishItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishItems(existingWishItems);
    }, []);

    // const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    const wishTotal = wishItems.reduce((accumulator, item) => accumulator + item.price, 0);
    const wishDiscount = wishItems.reduce((accumulator, item) => accumulator + item.discount, 0);
    const productIds = wishItems?.map(item => item.id);



    const handleSubmit = (e) => {
        e.preventDefault();

        const details = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            address: address,
            city: city,
            country: country,
            zip_code: zipCode,
            phone: telephone,
            paid: false,
            total: wishTotal,
            cancel: false,
            payment_method: paymentMethod,
            discount: wishDiscount,
            order_id: "ORD" + Math.floor(Math.random() * 1000000000),
            order_data: wishItems,
            status: "Shipping in Progress",
            products: wishItems,
            user: 1

        }


        axios.post(`${API_URL}order/order/`, 
            details
        )
            .then(res => {
                console.log(res.data);
                navigate('/order-success');
            }
            )
            .catch(err => console.log(err));
    }



    return (
        <>

            <div id="breadcrumb" className="section">

                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="breadcrumb-header">Checkout</h3>
                            <ul className="breadcrumb-tree">
                                <li><a href="#">Home</a></li>
                                <li className="active">Checkout</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

            <div className="section">

                <div className="container">
                    <form className="billing-details" onSubmit={handleSubmit}>
                    <div className="row">

                        <div className="col-md-7">

                            <div className="billing-details">
                                <div className="form-group">
                                    <input className="input" type="text" name="first-name" placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="last-name" placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="email" name="email" placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="address" placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="city" placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="country" placeholder="Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="zip-code" placeholder="ZIP Code"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="tel" name="tel" placeholder="Telephone"
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col-md-5 order-details"
                            style={{
                                position: "sticky",
                                top: 0,
                                background: "white",
                                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                                padding: "20px",
                                marginTop: "20px",
                            }}
                        >
                            <div className="section-title text-center">
                                <h3 className="title">Your Order</h3>
                            </div>
                            <div className="order-summary">
                                <div className="order-col">
                                    <div><strong>PRODUCT</strong></div>
                                    <div><strong>TOTAL</strong></div>
                                </div>
                                <div className="order-products">
                                    {wishItems.map((item, index) => (
                                        <div className="order-col" key={index}>
                                            <div>{item.name}</div>
                                            <div>
                                                ₹{(item.price).toFixed(2)}</div>
                                        </div>
                                    ))}

                                </div>
                                <div className="order-col">
                                    <div>Shipping</div>
                                    <div><strong>FREE</strong></div>
                                </div>
                                <div className="order-col">
                                    <div><strong>TOTAL</strong></div>
                                    <div><strong className="order-total">
                                        ₹{wishTotal.toFixed(2)}</strong></div>
                                </div>
                            </div>
                            <div className="payment-method">
                                <Group position="left">
                                    <div className="input-radio">
                                        <input type="radio" name="payment" id="payment-2"
                                            value="Pay Online"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            checked={paymentMethod === "Pay Online"}
                                        />
                                        <label htmlFor="payment-2">
                                            <span></span>
                                            Pay Online
                                        </label>

                                    </div>
                                    <div className="input-radio">
                                        <input type="radio" name="payment" id="payment-3"
                                            value={"Cash on Delivery"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            checked={paymentMethod === "Cash on Delivery"}
                                        />
                                        <label htmlFor="payment-3">
                                            <span></span>
                                            Cash on Delivery
                                        </label>

                                    </div>
                                </Group>
                            </div>
                            <div className="input-checkbox">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">
                                    <span></span>
                                    I've read and accept the <a href="#">terms & conditions</a>
                                </label>
                            </div>
                                <button className="primary-btn order-submit" style={{
                                    width: '100%',
                                    color: 'white',
                                    backgroundColor: 'red',
                                }}
                                    type='submit'
                                >Place order</button>
                        </div>
                    </div>
                </form>
                </div>

            </div>

        </>
    )
}

export default WishListCheckOut