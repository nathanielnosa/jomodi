import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Menu, Button, Text } from '@mantine/core';

function WishCart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    const dispatch = useDispatch();

    useEffect(() => {
        // Update cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        // Update wishlist in local storage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (index) => {
        dispatch(removeFromCart(index));
    };

    const handleRemoveFromWishlist = (index) => {
        dispatch(removeFromWishlist(index));
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
    };

    const cartQuantity = cartItems.length;
    const wishlistQuantity = wishlist.length;
    const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    // State to handle the menu toggle
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    // Function to handle the menu toggle
    const handleWishlistToggle = () => {
        setWishlistOpen((prevState) => !prevState);
    };

    const handleCartToggle = () => {
        setCartOpen((prevState) => !prevState);
    };

    const location = useLocation();

    // Close the dropdowns when the location changes (i.e., when navigating to another page)
    useEffect(() => {
        setWishlistOpen(false);
        setCartOpen(false);
    }, [location]);

    return (
        <div className="col-md-12 clearfix">
            <div className="header-ctn" style={{ display: 'flex' }}>
                {/* Wishlist Dropdown */}
                <Menu shadow="md" width={200}>
                    <Menu.Target style={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                    }}>
                        <a
                            className="dropdown-toggle"
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'none', // Add some space between the dropdowns
                            }}
                        >
                            <i className="fa fa-user"></i>
                            <span>Profile</span>
                        </a>
                    </Menu.Target>
                

                    <Menu.Dropdown>
                        <Menu.Item >
                            <Link to="/wishlist" 
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'none', 
                                margin: '10px',
                                padding: '10px',
                                fontSize: '1.5rem',
                            }}
                            >Wishlist</Link>
                        </Menu.Item>
                        <Menu.Item >
                            <Link to='/order'
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    margin: '10px',
                                    padding: '10px',
                                    fontSize: '1.5rem',
                                }}
                            >Order</Link>
                        </Menu.Item>
                        <Menu.Item >
                            <Link to='/profile'
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: 'none', 
                                    margin : '10px',
                                    padding : '10px',
                                    fontSize : '1.5rem',
                                }}
                            >Profile</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item color="red"
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'none', 
                                margin: '10px',
                                padding: '10px',
                                fontSize: '1.5rem',
                            }}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                {/* Cart Dropdown */}
                <div className={`dropdown ${cartOpen ? 'open' : ''}`}>
                    <a
                        className="dropdown-toggle"
                        onClick={handleCartToggle} // Add the click event to toggle the menu
                        aria-expanded={cartOpen}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            marginLeft: '15px', 

                        }}
                    >
                        <i className="fa fa-shopping-cart"></i>
                        <span>Your Cart</span>
                        <div className="qty">{cartQuantity}</div>
                    </a>
                    <div className={`cart-dropdown ${cartOpen ? 'show' : ''}`}>
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
                                            <span className="qty">{item.quantity}x</span>
                                            ₹{item.price.toFixed(2)}
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
                            <h5>SUBTOTAL:
                                ₹{cartTotal.toFixed(2)}</h5>
                        </div>
                        <div className="cart-btns">
                            <Link to="/cart">View Cart</Link>
                            <Link to="/checkout">
                                Checkout <i className="fa fa-arrow-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishCart;
