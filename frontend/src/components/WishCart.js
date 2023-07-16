import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WishCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Get cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(existingCartItems);
    }, [true]);

    const handleAddToCart = (product) => {
        // Check if the product already exists in the cart
        const productIndex = cartItems.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
            // If the product already exists, increase its quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[productIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            // If the product doesn't exist, add it to the cart
            const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(updatedCartItems);
        }

        // Update cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const handleRemoveFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        // Update cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const cartQuantity = cartItems.length;
    const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div className="col-md-3 clearfix">
            <div className="header-ctn">
                <div>
                    <a href="#">
                        <i className="fa fa-heart-o"></i>
                        <span>Your Wishlist</span>
                        <div className="qty">{cartQuantity}</div>
                    </a>
                </div>
                <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-shopping-cart"></i>
                        <span>Your Cart</span>
                        <div className="qty">{cartQuantity}</div>
                    </a>
                    <div className="cart-dropdown">
                        <div className="cart-list">
                            {cartItems.map((item, index) => (
                                <div className="product-widget" key={index}>
                                    <div className="product-img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="product-body">
                                        <h3 className="product-name">
                                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                                        </h3>
                                        <h4 className="product-price">
                                            <span className="qty">{item.quantity}x</span>${item.price.toFixed(2)}
                                        </h4>
                                    </div>
                                    <button className="delete" onClick={() => handleRemoveFromCart(index)}>
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <small>{cartQuantity} Item(s) selected</small>
                            <h5>SUBTOTAL: ${cartTotal.toFixed(2)}</h5>
                        </div>
                        <div className="cart-btns">
                            <Link to="/cart">View Cart</Link>
                            <Link to="/checkout">
                                Checkout <i className="fa fa-arrow-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-toggle">
                    <a href="#">
                        <i className="fa fa-bars"></i>
                        <span>Menu</span>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default WishCart;
