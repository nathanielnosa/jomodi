import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import Slider from "react-slick";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { addToWishlist, removeFromWishlist } from "../actions/wishActions";
import { Notification, Alert, Avatar, Group, Text, Badge } from "@mantine/core";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '../styles/imageZoom.css'
import { notifications } from '@mantine/notifications';
import 'tailwindcss/tailwind.css';
import { IconHeart } from "@tabler/icons-react";
import { get } from "jquery";
import { height } from "@mui/system";

function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
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
    const [showSizeError, setShowSizeError] = useState(false);
    const [showColorError, setShowColorError] = useState(false);
    const [colorImage, setColorImage] = useState([]);


    const isAuth = localStorage.getItem('authenticated')

    const phoneNumber = 918456969102
    const dispatch = useDispatch();

    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    useEffect(() => {
        // Update wishlist in local storage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const cartItems = useSelector((state) => state.cart.cartItems);

    console.log(wishlist)

    const errorSize = selectedSize == "";
    const errorColor = selectedColor == "";

    const handleAddToCart = (product) => {
        dispatch(addToCart(product, quantity, false, selectedSize, selectedGender, selectedColor));
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
        if (quantity < product?.available_quantity) {
            setQuantity(quantity + 1);
        }
        // setQuantity(quantity + 1);
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
            .get(`${API_URL}product/colorimage_fetch/?product_id=${id}`)
            .then((res) => {
                console.log("image", res.data.results);
                setColorImage(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);


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


    const getDiscount = (product) => {
        const discount = ((product?.cancel_price - product?.price) / product?.cancel_price) * 100;
        return discount.toFixed(0);
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

    const [showFullDescription, setShowFullDescription] = useState(false);

    const words = product?.description?.split(" ");
    const truncatedDescription = words?.slice(0, 100).join(" ");
    const remainingDescription = words?.slice(100).join(" ");

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

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

            <div>
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                       

                        <div className="col-md-1 h-20 md:col-md-1  md:h-auto">
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
                                                        border: '1px solid black',
                                                        height: '200px',
                                                        width: '200px'
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
                                            onMouseLeave={() => setZoomImage("")}
                                            style={{
                                                border: '1px solid black',

                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-5  mb-4 md:mb-0 md:col-md-5">
                            <div id="product-main-img">
                                <div className="product-preview">
                                    <img src={zoomImage || product.image} alt=""
                                        style={{
                                            height: '400px',
                                            width: '400px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mt-4 md:mt-0 md:col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">{product?.name}</h2>
                                <div>
                                    <h3 className="product-price">
                                        ₹{product?.price}{" "}
                                        <del className="product-old-price">
                                            ₹{product?.cancel_price}
                                        </del>
                                    </h3>
                                    <h4 className="product-price"
                                        style={{
                                            color: 'green',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        {getDiscount(product) > 0 ? (
                                            <span className="product-discount">
                                                {getDiscount(product)}% OFF
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </h4>
                                    <div>
                                        <h4 className="product-price"
                                            style={{
                                                color: 'green',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            {product?.available_quantity > 0 ? (
                                                <span className="product-discount">
                                                    Available Qty: {product?.available_quantity}
                                                </span>
                                            ) : (
                                                <span>
                                                    Out of Stock
                                                </span>
                                            )}
                                        </h4>
                                    </div>
                                    <ul className="product-links">
                                        <li>Category:</li>
                                        <li>{product?.category?.name}, </li>
                                        <li>{product?.brand?.name}</li>
                                    </ul>
                                </div>

                                <Text variant="label" size="xl" style={{ fontWeight: 'bold' }}>Description</Text>
                                <p
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {showFullDescription ? product?.description : truncatedDescription}
                                </p>
                                {words?.length > 100 && (
                                    <span
                                        style={{ cursor: "pointer", color: "blue" }}
                                        onClick={toggleDescription}
                                    >
                                        {showFullDescription ? "See Less" : "See More"}
                                    </span>
                                )}

                                <div className="product-options">
                                    {
                                        product?.show_size && (

                                            <Group variant="filled" mb="sm" mt="xs" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <Text variant="label" style={{ marginRight: '10px' }}>Size
                                                </Text>
                                                {
                                                    (product?.size?.split(','))?.map((siz, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant={
                                                                selectedSize == siz ? 'dot' : 'light'
                                                            }
                                                            radius="xl"
                                                            size="xl"

                                                            onClick={() => setSelectedSize(siz)}
                                                            style={{
                                                                fontWeight: selectedSize == siz ? 'bold' : 'normal',
                                                                fontSize: selectedSize == siz ? '10px' : '15px',
                                                                borderRadius: '50%',
                                                                height: '50px',
                                                                width: '50px',
                                                                cursor: 'pointer',
                                                            }}
                                                        >

                                                            {siz}
                                                        </Badge>
                                                    ))
                                                }
                                            </Group>
                                        )
                                    }
                                    {
                                        (product?.show_size && errorSize) && (
                                            <Text variant="label" color="red" size="sm" style={{ fontWeight: 'bold' }}>
                                                Please select a size
                                            </Text>
                                        )
                                    }
                                    {
                                        selectedSize && (
                                            <Text variant="label" size="lg" style={{ fontWeight: 'bold' }}>
                                                Selected Size: {selectedSize}
                                            </Text>
                                        )
                                    }
                                    {
                                        product?.show_color && (
                                            <Group variant="filled" mb="sm" mt="xs" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <Text variant="label" style={{ marginRight: '10px' }}>
                                                    Color
                                                </Text>
                                                {
                                                    [...new Set(colorImage.map(color => color.color))].map((uniqueColor, index) => (
                                                        <Badge
                                                            key={index}
                                                            radius="xl"
                                                            size="xl"
                                                            style={{
                                                                width: '45px',
                                                                height: '45px',
                                                                borderRadius: '50%',
                                                                backgroundColor: uniqueColor,
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => setSelectedColor(uniqueColor)}
                                                            onMouseEnter={() => setZoomImage(colorImage.find(color => color.color === uniqueColor).image)}
                                                            onMouseLeave={() => setZoomImage("")}
                                                        ></Badge>
                                                    ))
                                                }
                                            </Group>
                                        )
                                    }
                                    {
                                        selectedColor && (
                                            <Text variant="label" size="lg" style={{ fontWeight: 'bold' }}>
                                                Selected Color: {selectedColor.toLocaleUpperCase()}
                                            </Text>
                                        )
                                    }
                                    {
                                        (product?.show_color && errorColor) && (
                                            <Text variant="label" color="red" size="sm" style={{ fontWeight: 'bold' }}>
                                                Please select a color
                                            </Text>
                                        )
                                    }
                                </div>

                                {
                                    product?.available_quantity > 0 && (
                                        <div className="add-to-cart">
                                            <div className="qty-label">
                                                Qty
                                                <div className="input-number">
                                                    <input
                                                        className="input-select"
                                                        type="number"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        max={10}
                                                        min={1}
                                                        step={1}
                                                        defaultValue={1}
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
                                            >
                                                {cartItems.find((item) => item.id === product.id) ? (
                                                    <span
                                                        onClick={() => handleRemoveFromCart(product.id)}
                                                    >
                                                        <i className="fa fa-check-circle"></i> Added to Cart
                                                    </span>
                                                ) : (
                                                    <span
                                                        onClick={() => handleAddToCart(product)}
                                                    >
                                                        <i className="fa fa-shopping-cart"></i> Add to Cart
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    )
                                }

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
                                    <li style={{
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                    }}>
                                        <button
                                            className="add-to-cart-btn"
                                            style={
                                                {
                                                    marginLeft: '10px',
                                                    marginTop: '10px',
                                                }
                                            }
                                        >
                                            {wishlist.find((item) => item.id == product.id) ? (
                                                <span
                                                    onClick={() => handleRemoveFromWishlist(product.id)}
                                                >
                                                    <i className="fa fa-heart"
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                    ></i> Added to Wishlist
                                                </span>

                                            ) : (
                                                <span onClick={() => handleAddToWishlist(product)}>
                                                    <i className="fa fa-heart-o"></i> Add to Wishlist
                                                </span>
                                            )}
                                        </button>
                                        {/* <i className="fa fa-heart-o" ></i> add to wishlist */}
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
                                                        whiteSpace: "pre-wrap",
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
                                                        whiteSpace: "pre-wrap",
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
                                                    <span className="sale">-{getDiscount(product)}%</span>
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
                                                <Link to={`/product/${product.id}/${product.name}`}>
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
                                                    onClick={() => handleRemoveFromCart(product.id)}
                                                >
                                                    <i className="fa fa-check-circle"></i> In Cart
                                                </span>
                                            ) : (
                                                <span onClick={() => handleAddToCart(product)}>
                                                    <i className="fa fa-shopping-cart"></i> Add to Cart
                                                </span>
                                            )}
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
