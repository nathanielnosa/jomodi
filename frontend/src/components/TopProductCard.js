import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishActions';
import { notifications } from '@mantine/notifications';


function TopProductCard({ product }) {
    const dispatch = useDispatch();
    const [showCartNotification, setShowCartNotification] = React.useState(false);
    const [showWishlistNotification, setShowWishlistNotification] = React.useState(false);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        notifications.show({
            title: 'Successfully Added to Cart',
            message: 'Successfully Added Cart! 🤥',
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.green[6],
                    borderColor: theme.colors.green[6],

                    '&::before': { backgroundColor: theme.white },
                },

                title: { color: theme.white },
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
            message: 'Successfully Added your Wish List! 🤥',
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.green[6],
                    borderColor: theme.colors.green[6],

                    '&::before': { backgroundColor: theme.white },
                },

                title: { color: theme.white },
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

            <div className="col-md-12 col-xs-12">
            
                <div className="product">
                    <Link to={`/product/${product.id}`} style={{
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
                    <div className="product-body">
                        <p className="product-category">{product?.category?.name}</p>
                        <h3 className="product-name">
                            <Link to={`/newproduct/${product.id}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >{product?.name}</Link>
                        </h3>
                        <h4 className="product-price">
                            ₹{product?.price} <del className="product-old-price">₹{product?.cancel_price}</del>
                        </h4>
                        {/* <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div> */}
                        <div className="product-btns">
                            <button className="add-to-wishlist" onClick={() => handleAddToWishlist(product)}><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>


                            <button className="quick-view">
                                <Link to={`/product/${product.id}`}>
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

export default TopProductCard;
