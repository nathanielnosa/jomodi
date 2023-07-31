import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { addToWishlist } from "../actions/wishActions";
import { Notification, Alert } from "@mantine/core";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '../styles/imageZoom.css'
import { notifications } from '@mantine/notifications';
import 'tailwindcss/tailwind.css';

function Product() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showCartNotification, setShowCartNotification] = React.useState(false);
    const [showWishlistNotification, setShowWishlistNotification] = React.useState(false);
    const [zoomImage, setZoomImage] = useState("");
    const [wishlistItems, setWishlistItems] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedGender, setSelectedGender] = useState("")


    const phoneNumber = 918456969102

    const dispatch = useDispatch();

    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    useEffect(() => {
        // Update wishlist in local storage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product, quantity));
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



    const handleAddToCart2 = (product) => {
        dispatch(addToCart(product, 1));
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
            const timeoutId = setTimeout(() => {
                setShowCartNotification(false);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [showCartNotification]);

    const addQuantity = () => {
        setQuantity(quantity + 1);
    };

    const subtractQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const totalSlides = images?.length;
    const slidesToShow = Math.min(totalSlides, 5);

    const settings = {
        vertical: true,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 3,
        dots: true,
        verticalSwiping: true,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: () => <li>•</li>,
        responsive: [
            {
                breakpoint: 1024, // Medium screens and above
                settings: {
                    slidesToShow: slidesToShow,
                    slidesToScroll: 3,
                    vertical: true,
                    verticalSwiping: true,
                },
            },
            {
                breakpoint: 768, // Small screens
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
        ],
    };


    useEffect(() => {
        axios
            .get(`${API_URL}product/product_detail/${id}/`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    // useEffect(() => {
    //     axios
    //         .get(`${API_URL}product/size/`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const filteredSizes = res.data.results.filter((size) => size.product == id);
    //             setSizes(filteredSizes);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [id]);

    // useEffect(() => {
    //     axios
    //         .get(`${API_URL}product/color/`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const filteredColors = res.data.results.filter((color) => color.product == id);
    //             setColors(filteredColors);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);


    useEffect(() => {
        axios
            .get(`${API_URL}product/image_fetch/?product_id=${id}`)
            .then((res) => {
                console.log(res.data);
                setImages(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                `${API_URL}product/category_product_fetch/?category_id=${product?.category?.id}`
            )
            .then((res) => {
                console.log(res.data);
                const shuffledProducts = res.data.results.sort(() => 0.5 - Math.random());

                // Select the first 3 products from the shuffled array for each group
                const selectedProducts = shuffledProducts.slice(0, 6);
                setRelatedProducts(selectedProducts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [product]);


    return (
        <div>

            <div id="breadcrumb" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumb-tree">
                                <li>
                                    <Link
                                        to="/"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/store"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        All Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/category/${product?.category?.id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        {product?.category?.name}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/category/${product?.category?.id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        {product?.brand?.name}
                                    </Link>
                                </li>
                                <li className="active">{product?.name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container px-4 py-4 md:py-8 md:px-8">
                    <div className="flex flex-wrap -mx-4">
                        <div className="col-md-6  mb-4 md:mb-0 md:col-md-5 md:col-md-push-24">
                            <div id="product-main-img">
                                <div className="product-preview">
                                    <img src={zoomImage || product.image} alt="" />
                                </div>

                            </div>
                        </div>

                        <div className="col-md-1 col-md-pull-6 h-20 md:col-md-1 md:col-md-pull-6 md:h-auto">
                            {/* Change the Carousel orientation to horizontal on small screens */}
                            <div id="product-imgs" className="md:hidden">
                                <Carousel
                                    slideSize="15%"
                                    height={700}
                                    align="start"
                                    orientation="horizontal" // Change orientation to horizontal on small screens
                                    slideGap="xs"
                                    loop
                                    controlsOffset="xs" controlSize={51} dragFree
                                >
                                    {images.map((image, index) => (
                                        <Carousel.Slide>
                                            <div key={index} className="product-preview">
                                                <img
                                                    src={image.image}
                                                    alt=""
                                                    onMouseEnter={() => setZoomImage(image.image)}
                                                    style={{
                                                        border: '1px solid black'
                                                    }}
                                                />
                                            </div>
                                        </Carousel.Slide>
                                    ))}
                                </Carousel>
                            </div>
                            {/* Render individual images directly on medium and large screens */}
                            <div id="product-imgs">
                                {images.map((image, index) => (
                                    <div key={index} className="product-preview">
                                        <img
                                            src={image.image}
                                            alt=""
                                            onMouseEnter={() => setZoomImage(image.image)}
                                            style={{
                                                border: '1px solid black'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-5 mt-4 md:mt-0 md:col-md-5">
                            <div className="product-details">

                                <h2 className="product-name">{product?.name}</h2>
                                <div>

                                </div>
                                <div>
                                    <h3 className="product-price">
                                        ₹{product?.price}{" "}
                                        <del className="product-old-price">
                                            ₹{product?.cancel_price}
                                        </del>
                                    </h3>

                                    <ul className="product-links">
                                        <li>Category:</li>
                                        <li>{product?.category?.name}</li>
                                        <li>{product?.brand?.name}</li>
                                    </ul>
                                </div>
                                <p
                                    style={{
                                        whiteSpace: "wrap",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {product?.description}
                                </p>

                                <div className="product-options">
                                    {
                                        product?.show_size && (
                                            <label>
                                                Size
                                                <select className="input-select"
                                                    value={selectedSize}
                                                    onChange={(e) => setSelectedSize(e.target.value)}
                                                    style={{
                                                        margin: '10px'
                                                    }}
                                                >
                                                    {
                                                        (product?.size?.split(','))?.map((color, index) => (
                                                            <option key={index} value={color}>{color}</option>
                                                        ))
                                                    }
                                                </select>
                                            </label>
                                        )
                                    }
                                    {
                                        product?.show_color && (
                                            <label>
                                                Color
                                                <select className="input-select"
                                                    value={selectedColor}
                                                    onChange={(e) => setSelectedColor(e.target.value)}
                                                    style={{
                                                        margin: '10px'
                                                    }}
                                                >
                                                    {
                                                        product?.color?.map((color, index) => (
                                                            <option key={index} value={color}>{color}</option>
                                                        ))
                                                    }
                                                </select>

                                            </label>
                                        )
                                    }

                                    {
                                        product?.show_gender && (
                                            <label>
                                                Color
                                                <select className="input-select"
                                                    value={selectedGender}
                                                    onChange={(e) => setSelectedGender(e.target.value)}
                                                    style={{
                                                        margin: '10px'
                                                    }}
                                                >
                                                    {
                                                        product?.gender?.map((color, index) => (
                                                            <option key={index} value={color}>{color}</option>
                                                        ))
                                                    }
                                                </select>

                                            </label>
                                        )
                                    }

                                </div>

                                <div className="add-to-cart">
                                    <div className="qty-label">
                                        Qty
                                        <div className="input-number">
                                            <input
                                                className="input-select"
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                            <span className="qty-up" onClick={addQuantity}>
                                                +
                                            </span>
                                            <span className="qty-down" onClick={subtractQuantity}>
                                                -
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <i className="fa fa-shopping-cart"></i> add to cart
                                    </button>
                                    <Link to={`/product-checkout/${product.id}/${product.name}`} target="_blank">
                                        <button
                                            style={{
                                                marginLeft: '20px',
                                                backgroundColor: "yellowgreen",
                                                padding: '7px',
                                                width: '100px',
                                                border: '0px',
                                                borderRadius: '5px',
                                                textTransform: 'capitalize',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            <i className="fa fa-shopping-cart"></i> buy now
                                        </button>
                                    </Link>
                                </div>
                                {/* 
                                <ul className="product-btns">
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=+${phoneNumber}&text=Hi, I am interested in your product ${product?.name}`}
                                        style={{
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <i className="fa fa-whatsapp"></i> Enquire on Whatsapp
                                    </a>
                                </ul> */}

                                <ul className="product-btns">
                                    <li>
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=+${phoneNumber}&text=Hi, I am interested in your product ${product?.name}`}
                                            style={{
                                                cursor: 'pointer',
                                                marginTop: '10px',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <i className="fa fa-whatsapp"></i> Enquire on Whatsapp
                                        </a>

                                    </li>
                                    <li onClick={() => handleAddToWishlist(product)} style={{
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                    }}>
                                        <i className="fa fa-heart-o" ></i> add to wishlist
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="col-md-12">
                            <div id="product-tab">

                                <ul className="tab-nav">
                                    <li className="active">
                                        <a
                                            data-toggle="tab"
                                            href="#tab1"
                                            style={{
                                                textDecoration: "none",
                                            }}
                                        >
                                            Description
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            data-toggle="tab"
                                            href="#tab2"
                                            style={{
                                                textDecoration: "none",
                                            }}
                                        >
                                            Details
                                        </a>
                                    </li>

                                </ul>

                                <div className="tab-content">
                                    <div id="tab1" className="tab-pane fade in active">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p
                                                    style={{
                                                        whiteSpace: "wrap",
                                                        wordWrap: "break-word",
                                                    }}
                                                >
                                                    {product?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tab2" className="tab-pane fade in">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p
                                                    style={{
                                                        whiteSpace: "wrap",
                                                        wordWrap: "break-word",
                                                    }}
                                                >
                                                    {product?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container px-4 py-4 md:py-8 md:px-8">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h3 className="title">Related Products</h3>
                            </div>
                        </div>

                        {relatedProducts.map((product, index) => (
                            <div className="col-md-2 col-xs-12">

                                <div className="product">
                                    <Link to={`/product/${product.id}/${product.name}`} target="_blank"
                                        style={{
                                            textDecoration: 'none',
                                        }}>
                                        <div className="product-img">
                                            <img src={product.image} alt=""
                                                style={{
                                                    height: "200px"
                                                }}
                                            />
                                            <div className="product-label">
                                                {product?.discount ? (
                                                    <span className="sale">-{product?.discount}%</span>
                                                ) : (
                                                    ""
                                                )}
                                                {product?.new == true ? <span className="new">NEW</span> : ""}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="product-body">
                                        <p className="product-category"

                                        >
                                            {product?.category?.name}
                                        </p>
                                        <h3 className="product-name">
                                            <Link
                                                to={`/product/${product?.id}/${product?.name}`}
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
                                            <del className="product-old-price">
                                                ₹{product?.cancel_price}
                                            </del>
                                        </h4>
                                        <div className="product-rating"></div>
                                        <div className="product-btns">
                                            <button
                                                className="add-to-wishlist"
                                                onClick={() => handleAddToWishlist(product)}
                                            >
                                                <i className="fa fa-heart-o"></i>
                                                <span className="tooltipp">add to wishlist</span>
                                            </button>

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
                                            onClick={() => handleAddToCart2(product)}
                                        >
                                            <i className="fa fa-shopping-cart"></i> add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
