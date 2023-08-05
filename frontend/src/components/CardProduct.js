import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishActions';
import { Notification, Alert } from '@mantine/core';

function CardProduct({ product }) {
    const dispatch = useDispatch();
    const [showCartNotification, setShowCartNotification] = React.useState(false);
    const [showWishlistNotification, setShowWishlistNotification] = React.useState(false);

    useEffect(() => {
        if (showWishlistNotification) {
            // Set a timeout of 2 seconds to close the alert
            const timeoutId = setTimeout(() => {
                setShowWishlistNotification(false);
            }, 2000);

            // Clean up the timeout when the component unmounts or when the alert is closed manually
            return () => clearTimeout(timeoutId);
        }
    }, [showWishlistNotification]);

    useEffect(() => {
        if (showCartNotification) {
            // Set a timeout of 2 seconds to close the alert
            const timeoutId = setTimeout(() => {
                setShowCartNotification(false);
            }, 2000);

            // Clean up the timeout when the component unmounts or when the alert is closed manually
            return () => clearTimeout(timeoutId);
        }
    }, [showCartNotification]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setShowCartNotification(true);
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
        setShowWishlistNotification(true);
    };

    return (
        <>
            {" "}
            {showCartNotification && (
                <Alert
                    title="Added to Cart"
                    color="green"
                    radius="xl"
                    variant="filled"
                    withCloseButton
                    closeButtonLabel="Close alert"
                    onClose={() => setShowCartNotification(false)}
                ></Alert>
            )}
            {showWishlistNotification && (
                <Alert
                    title="Added to Wishlist"
                    color="green"
                    radius="xl"
                    variant="filled"
                    withCloseButton
                    closeButtonLabel="Close alert"
                    onClose={() => setShowWishlistNotification(false)}
                />
            )}
            <div className="col-md-12 col-xs-12">
               

                <div className="product">
                    <Link to={`/product/${product.id}/${product.name}`} style={{
                        textDecoration: 'none',
                    }}>
                        <div className="product-img">
                            <img
                                src={product.image}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: '200px',
                                }}
                            />
                            <div className="product-label">
                                {
                                    product?.discount != 0 ? <span className="sale">-{product?.discount}%</span> : ''
                                }
                                {
                                    product?.new == true ? <span className="new">NEW</span> : ''
                                }
                            </div>
                        </div>
                    </Link>
                    <div className="product-body">
                        <p className="product-category">{product?.category?.name}</p>
                        <h3 className="product-name">
                            <Link to={`/product/${product.id}/${product.name}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >{product?.name}</Link>
                        </h3>
                        <h4 className="product-price">
                            ₹{product?.price} <del className="product-old-price">₹{product?.cancel_price}</del>
                        </h4>
                        <div className="product-btns">
                            <button className="add-to-wishlist" onClick={() => handleAddToWishlist(product)}><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
                            <button className="quick-view">
                                <Link to={`/product/${product.id}/${product.name}`}>
                                    <i className="fa fa-eye"></i><span className="tooltipp">quick view</span>
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="add-to-cart">
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                            <i className="fa fa-shopping-cart"></i>
                            add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CardProduct;
