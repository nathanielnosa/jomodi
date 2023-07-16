import React, {useEffect, useState} from 'react'

function Checkout() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Get cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(existingCartItems);
    }, []);

    const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    return (
        <>

            <div id="breadcrumb" class="section">

                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="breadcrumb-header">Checkout</h3>
                            <ul class="breadcrumb-tree">
                                <li><a href="#">Home</a></li>
                                <li class="active">Checkout</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

            <div class="section">

                <div class="container">

                    <div class="row">

                        <div class="col-md-7">

                            <div class="billing-details">
                                <div class="section-title">
                                    <h3 class="title">Billing address</h3>
                                </div>
                                <div class="form-group">
                                    <input class="input" type="text" name="first-name" placeholder="First Name" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="text" name="last-name" placeholder="Last Name" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="email" name="email" placeholder="Email" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="text" name="address" placeholder="Address" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="text" name="city" placeholder="City" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="text" name="country" placeholder="Country" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="text" name="zip-code" placeholder="ZIP Code" />
                                </div>
                                <div class="form-group">
                                    <input class="input" type="tel" name="tel" placeholder="Telephone" />
                                </div>
                                <div class="form-group">
                                    <div class="input-checkbox">
                                        <input type="checkbox" id="create-account" />
                                        <label for="create-account">
                                            <span></span>
                                            Create Account?
                                        </label>
                                        <div class="caption">
                                            <p>Creata a Password for your account.</p>
                                            <input class="input" type="password" name="password" placeholder="Enter Your Password" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="shiping-details">
                                <div class="section-title">
                                    <h3 class="title">Shiping address</h3>
                                </div>
                                <div class="input-checkbox">
                                    <input type="checkbox" id="shiping-address" />
                                    <label for="shiping-address">
                                        <span></span>
                                        Ship to a diffrent address?
                                    </label>
                                    <div class="caption">
                                        <div class="form-group">
                                            <input class="input" type="text" name="first-name" placeholder="First Name" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="text" name="last-name" placeholder="Last Name" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="email" name="email" placeholder="Email" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="text" name="address" placeholder="Address" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="text" name="city" placeholder="City" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="text" name="country" placeholder="Country" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="text" name="zip-code" placeholder="ZIP Code" />
                                        </div>
                                        <div class="form-group">
                                            <input class="input" type="tel" name="tel" placeholder="Telephone" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="order-notes">
                                <textarea class="input" placeholder="Order Notes"></textarea>
                            </div>

                        </div>


                        <div class="col-md-5 order-details">
                            <div class="section-title text-center">
                                <h3 class="title">Your Order</h3>
                            </div>
                            <div class="order-summary">
                                <div class="order-col">
                                    <div><strong>PRODUCT</strong></div>
                                    <div><strong>TOTAL</strong></div>
                                </div>
                                <div class="order-products">
                                    {cartItems.map((item, index) => (
                                        <div className="order-col" key={index}>
                                            <div>{item.quantity}x {item.name}</div>
                                            <div>${(item.quantity * item.price).toFixed(2)}</div>
                                        </div>
                                    ))}
                                   
                                </div>
                                <div class="order-col">
                                    <div>Shiping</div>
                                    <div><strong>FREE</strong></div>
                                </div>
                                <div class="order-col">
                                    <div><strong>TOTAL</strong></div>
                                    <div><strong class="order-total">${cartTotal.toFixed(2)}</strong></div>
                                </div>
                            </div>
                            <div class="payment-method">
                                {/* <div class="input-radio">
                                  <input type="radio" name="payment" id="payment-1"/>
                                      <label for="payment-1">
                                          <span></span>
                                          Direct Bank Transfer
                                      </label>
                                      <div class="caption">
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                      </div>
                              </div> */}
                                {/* <div class="input-radio">
                                  <input type="radio" name="payment" id="payment-2"/>
                                      <label for="payment-2">
                                          <span></span>
                                          Cheque Payment
                                      </label>
                                      <div class="caption">
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                      </div>
                              </div> */}
                                <div class="input-radio">
                                    <input type="radio" name="payment" id="payment-3" />
                                    <label for="payment-3">
                                        <span></span>
                                        Paypal System
                                    </label>
                                    <div class="caption">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="input-checkbox">
                                <input type="checkbox" id="terms" />
                                <label for="terms">
                                    <span></span>
                                    I've read and accept the <a href="#">terms & conditions</a>
                                </label>
                            </div>
                            <a href="#" class="primary-btn order-submit">Place order</a>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Checkout