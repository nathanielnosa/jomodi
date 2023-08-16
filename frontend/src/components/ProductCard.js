import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { addToWishlist, removeFromWishlist } from "../actions/wishActions";
import { notifications } from '@mantine/notifications';
import AddtoCartPopUp from "./AddtoCartPopUp";


function ProductCard({ product, index }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showCartNotification, setShowCartNotification] = React.useState(false);
    const [showWishlistNotification, setShowWishlistNotification] =
        React.useState(false);

    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showSizeError, setShowSizeError] = useState(false);
    const [showColorError, setShowColorError] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    const handleOpen = (product) => {
        setOpenModal(true)
        setSelectedProduct(product)
    }


    const handleCloseModal = () => {
        setSelectedProduct([])
        setSelectedSize(null)
        setSelectedColor(null)
        setOpenModal(false)
    }

    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const isAuth = localStorage.getItem('authenticated');

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
        dispatch(addToCart(product, 1, false, selectedSize, '', selectedColor));
        handleCloseModal()
        notifications.show({
            title: 'Successfully Added to Cart',
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.green[6],
                    borderColor: theme.colors.green[6],
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
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
        notifications.show({
            title: 'Successfully Added your Wish List',
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.green[6],
                    borderColor: theme.colors.green[6],

                    '&::before': { backgroundColor: theme.white },
                    height: '100px',
                    width: 'auto',

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
    const handleRemoveFromWishlist = (index) => {
        dispatch(removeFromWishlist(index));
        notifications.show({
            title: "Successfully Removed from Wish List",

            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    height: "70px",
                    width: "auto",

                    "&::before": { backgroundColor: theme.red },
                },

                title: { color: theme.white, fontSize: "20px" },
                description: { color: theme.white },
                closeButton: {
                    color: theme.white,
                    "&:hover": { backgroundColor: theme.colors.green[7] },
                },
            }),
        });
    };


    const handleRemoveFromCart = (index) => {
        dispatch(removeFromCart(index));
        notifications.show({
            title: "Successfully Removed from Cart",

            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    height: "70px",
                    width: "auto",

                    "&::before": { backgroundColor: theme.red },
                },

                title: { color: theme.white, fontSize: "20px" },
                description: { color: theme.white },
                closeButton: {
                    color: theme.white,
                    "&:hover": { backgroundColor: theme.colors.green[7] },
                },
            }),
        });
    };
    const getDiscount = (product) => {
        const discount = ((product?.cancel_price - product?.price) / product?.cancel_price) * 100;
        return discount.toFixed(0);
    };
    return (
        <>
            <AddtoCartPopUp
                product={selectedProduct}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                setSelectedColor={setSelectedColor}
                setSelectedSize={setSelectedSize}
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                addtoCart={() => handleAddToCart(selectedProduct)}
            />
            <div className="col-md-3 col-xs-12">
                <div className="product">
                    <Link
                        to={`/product/${product.id}/${product.name}`}
                        target="_blank"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <div className="product-img">
                            <img src={product.image} alt=""
                                style={{
                                    width: '100%',
                                    height: '200px',
                                }}
                            />
                            <div className="product-label">
                                {product?.discount ? (
                                    <span className="sale">-{getDiscount(product)}%</span>
                                ) : (
                                    ""
                                )}
                                {product?.new == true ? <span className="new">NEW</span> : ""}
                            </div>
                        </div>
                    </Link>
                    <div className="product-body">
                        <p
                            className="product-category"
                            style={{
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "100%", // Adjust the width to your desired size
                                display: "inline-block",
                            }}
                        >
                            {product?.brand?.name}
                        </p>
                        <h3 className="product-name">
                            <Link
                                to={`/product/${product.id}/${product.name}`}
                                target="_blank"
                                style={{
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "100%", // Adjust the width to your desired size
                                    display: "inline-block",
                                }}
                            >
                                {product?.name}
                            </Link>
                        </h3>
                        <h4 className="product-price">
                            ₹{product?.price}{" "}
                            <del className="product-old-price">₹{product?.cancel_price}</del>
                        </h4>
                        <div className="product-btns">
                            {
                                isAuth ? (
                                    <button
                                        className="add-to-wishlist"
                                    >
                                        {wishlist.find((item) => item.id == product.id) ? (
                                            <span onClick={() => handleRemoveFromWishlist(product.id)}>
                                                <i
                                                    className="fa fa-heart"
                                                    style={{
                                                        color: "red",
                                                    }}
                                                ></i>
                                                <span className="tooltipp">In wishlist</span>
                                            </span>
                                        ) : (
                                            <span onClick={() => handleAddToWishlist(product)}>
                                                <i className="fa fa-heart-o"></i>
                                                <span className="tooltipp">add to wishlist</span>
                                            </span>
                                        )}
                                    </button>
                                ) :

                                    (
                                        <button
                                            className="add-to-wishlist"
                                            onClick={() => navigate('/login')}
                                            disabled={wishlist.find((item) => item.id == product.id)}
                                        >
                                            <span>
                                                <i className="fa fa-heart-o"></i>
                                                <span className="tooltipp">add to wishlist</span>
                                            </span>

                                        </button>
                                    )
                            }

                            <button className="quick-view">
                                <Link to={`/product/${product.id}/${product.name}`} target="_blank">
                                    <i className="fa fa-eye"></i>
                                    <span className="tooltipp">quick view</span>
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="add-to-cart">
                        <button
                            className="add-to-cart-btn"
                        >
                            {cartItems.find((item) => item.id === product.id) ? (
                                <span
                                    onClick={() => navigate('/cart')}
                                >
                                    <i className="fa fa-check-circle"></i> Go to Cart
                                </span>
                            ) : (
                                (product?.show_size || product?.show_color) ? (
                                    <span onClick={() => handleOpen(product)}>
                                        <i className="fa fa-shopping-cart"></i> Add to Cart
                                    </span>
                                ) : (
                                    <span onClick={() => handleAddToCart(product)}>
                                        <i className="fa fa-shopping-cart"></i> Add to Cart
                                    </span>
                                )

                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="clearfix visible-sm visible-xs"></div>
        </>
    );
}

export default ProductCard;
