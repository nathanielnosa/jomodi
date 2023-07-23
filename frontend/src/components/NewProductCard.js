import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishActions';
import { notifications } from '@mantine/notifications';
import { Group, Button } from '@mantine/core';
import NewProduct from './NewProduct';

function NewProductCard({ product }) {
    const dispatch = useDispatch();
    const [showCartNotification, setShowCartNotification] = React.useState(false);
    const [showWishlistNotification, setShowWishlistNotification] = React.useState(false);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product, 1));
        notifications.show({
            title: 'Successfully Added to Cart',
            message: 'Successfully Added Cart! 🤥',
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.teal,
                    borderColor: theme.colors.teal,
                    height: '100px',
                    width: 'auto',

                    '&::before': { backgroundColor: theme.teal },
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

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
        notifications.show({
            title: 'Successfully Added your Wish List',
    
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.teal,
                    borderColor: theme.colors.teal,
                    height: '100px',
                    width: 'auto',

                    '&::before': { backgroundColor: theme.teal },
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
        <>

            <div className="col-md-12 col-xs-12" style={{
                marginBottom: '90px',
                // marginTop: '200px',
            }}>
              
                <div className="product">
                    <Link to={`/product/${product.id}/${product.name}`} target="_blank" style={{
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
                                    (product?.discount > 0 || product?.discount < 0) ? <span className="sale">-{product?.discount}%</span> : ''
                                }
                                {
                                    product?.new == true ? <span className="new">NEW</span> : ''
                                }
                            </div>
                        </div>
                    </Link>
                    <div className="product-body" >
                        <p className="product-category">{product?.category?.name}</p>
                        <h3 className="product-name">
                            <Link to={`/product/${product.id}/${product.name}`} target="_blank"
                                style={{
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "100%", // Adjust the width to your desired size
                                    display: "inline-block",
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

export default NewProductCard;
