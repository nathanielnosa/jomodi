import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';

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

    return (
        <div className="col-md-3 clearfix">
            <div className="header-ctn">
                <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style={{
                        cursor: 'pointer',
                        textDecoration: 'none'

                    }}>
                        <i className="fa fa-heart-o"></i>
                        <span>Your Wishlist</span>
                        <div className="qty">{wishlistQuantity}</div>
                    </a>
                    <div className="cart-dropdown">
                        <div className="cart-list">
                            {wishlist.map((item, index) => (
                                <div className="product-widget" key={index}>
                                    <div className="product-img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="product-body">
                                        <h3 className="product-name">
                                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                                        </h3>
                                        <h4 className="product-price">
                                            <span className="qty"></span>${item.price.toFixed(2)}
                                        </h4>
                                    </div>
                                    <button className="delete" onClick={() => handleRemoveFromWishlist(index)}>
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <small>{wishlistQuantity} Item(s) selected</small>
                            {/* <h5>SUBTOTAL: ${wis.toFixed(2)}</h5> */}
                        </div>
                        <div className="cart-btns">
                            {/* <Link to="/cart">View Favourite list</Link> */}
                            <Link to="/wishlist">
                                View List <i className="fa fa-arrow-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" style={{
                        cursor: 'pointer',
                        textDecoration: 'none'
                        
                    }}>
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
