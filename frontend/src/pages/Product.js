import React, { useEffect, useState } from 'react'
import { Carousel } from '@mantine/carousel';
import Slider from 'react-slick';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const settings = {
        vertical: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        verticalSwiping: true,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: () => <li>•</li>,
        responsive: [
            {
                breakpoint: 768,
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
        axios.get(`${API_URL}product/product_detail/${id}/`)
            .then(res => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${API_URL}product/image_fetch/?product_id=${id}`)
            .then(res => {
                console.log(res.data);
                setImages(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`${API_URL}product/category_product_fetch/?category_id=${product?.category?.id}`)
            .then(res => {
                console.log(res.data);
                setRelatedProducts(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, [product]);

    const handleAddToCart = (product) => {
        // Get the existing cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const productIndex = existingCartItems.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            // If the product already exists, increase its quantity
            existingCartItems[productIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart
            existingCartItems.push({ ...product, quantity: 1 });
        }

        // Store the updated cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    };

    console.log(product)
    console.log(`${API_URL}product/image_fetch/?product_id=${id}/`)

    const settings2 = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: () => <li>•</li>,
        draggable: true,
        adaptiveHeight: true,
        variableWidth: true,
    };

    return (
        <div>

            <div id="breadcrumb" class="section">

                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumb-tree">
                                <li>
                                    <Link to="/">
                                    Home</Link></li>
                                <li>
                                    <Link to="/store">
                                    All Categories</Link></li>
                                <li>
                                    <Link to={`/category/${product?.category?.id}`}>
                                        {
                                            product?.category?.name
                                        }
                                    </Link></li>
                                <li>
                                    <Link to={`/category/${product?.category?.id}`}>
                                        {
                                            product?.brand?.name
                                        }
                                    </Link></li>
                                <li class="active">
                                    {
                                        product?.name
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>



            <div class="section">

                <div class="container">

                    <div class="row">

                        <div class="col-md-5 col-md-push-2">

                            <div id="product-main-img">
                                <Slider {...settings2}>
                                    <div className="product-preview">
                                        <img src={product.image} alt="" />
                                    </div>
                                    {
                                        images?.map((image, index) => (
                                            <div key={index} className="product-preview">
                                                <img src={image.image} alt="" />
                                            </div>
                                        ))
                                    }


                                </Slider>
                            </div>
                        </div>



                        <div class="col-md-2  col-md-pull-5">

                            <div id="product-imgs">
                                <Slider {...settings}>
                                    {
                                        images.map((image, index) => (
                                            <div key={index} className="product-preview">
                                                <img src={image.image} alt="" />
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>

                        </div>



                        <div class="col-md-5">
                            <div class="product-details">
                                <h2 class="product-name">
                                    {
                                        product?.name
                                    }
                                </h2>
                                <div>
                                    <div class="product-rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                    <a class="review-link" href="#">10 Review(s) | Add your review</a>
                                </div>
                                <div>
                                    <h3 class="product-price">${product?.price}0 <del class="product-old-price">${product?.cancel_price}</del></h3>
                                    <span class="product-available">In Stock</span>
                                </div>
                                <p style={{
                                    whiteSpace: "wrap",
                                    wordWrap: "break-word"
                                }}>
                                    {product?.description}
                                </p>

                                <div class="product-options">
                                    <label>
                                        Size
                                        <select class="input-select">
                                            <option value="0">X</option>
                                        </select>
                                    </label>
                                    <label>
                                        Color
                                        <select class="input-select">
                                            <option value="0">Red</option>
                                        </select>
                                    </label>
                                </div>

                                <div class="add-to-cart">
                                    <div class="qty-label">
                                        Qty
                                        <div class="input-number">
                                            <input type="number" />
                                            <span class="qty-up">+</span>
                                            <span class="qty-down">-</span>
                                        </div>
                                    </div>
                                    <button class="add-to-cart-btn" onClick={() => handleAddToCart(product)}><i class="fa fa-shopping-cart"></i> add to cart</button>
                                </div>

                                <ul class="product-btns">
                                    <li><a href="#"><i class="fa fa-heart-o"></i> add to wishlist</a></li>
                                    <li><a href="#"><i class="fa fa-exchange"></i> add to compare</a></li>
                                </ul>

                                <ul class="product-links">
                                    <li>Category:</li>
                                    <li><a href="#">
                                        {
                                            product?.category?.name
                                        }
                                    </a></li>
                                    <li><a href="#">
                                        {
                                            product?.brand?.name
                                        }
                                    </a></li>
                                </ul>


                            </div>
                        </div>


                        <div class="col-md-12">
                            <div id="product-tab">

                                <ul class="tab-nav">
                                    <li class="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Details</a></li>
                                    {/* <li><a data-toggle="tab" href="#tab3">Reviews (3)</a></li> */}
                                </ul>

                                <div class="tab-content">

                                    <div id="tab1" class="tab-pane fade in active">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p style={{
                                                    whiteSpace: "wrap",
                                                    wordWrap: "break-word"
                                                }}>
                                                    {
                                                        product?.description
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tab2" class="tab-pane fade in">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p style={{
                                                    whiteSpace: "wrap",
                                                    wordWrap: "break-word"
                                                }}>
                                                    {
                                                        product?.description
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                </div >

            </div >

            <div class="section">

                <div class="container">

                    <div class="row">

                        <div class="col-md-12">
                            <div class="section-title text-center">
                                <h3 class="title">Related Products</h3>
                            </div>
                        </div>

                        {
                            relatedProducts.map((product, index) => (

                                <div class="col-md-3 col-xs-6">
                                    <div class="product">
                                        <div class="product-img">
                                            <img src={product.image} alt="" />
                                            <div class="product-label">
                                                <span class="sale">-30%</span>
                                            </div>
                                        </div>
                                        <div class="product-body">
                                            <p class="product-category">
                                                {
                                                    product?.category?.name
                                                }
                                            </p>
                                            <h3 class="product-name">
                                                <Link to={`/product/${product?.id}`}>
                                                    {product?.name}
                                                </Link></h3>
                                            <h4 class="product-price">${product?.price} <del class="product-old-price">${product?.cancel_price}</del></h4>
                                            <div class="product-rating">
                                            </div>
                                            <div class="product-btns">
                                                <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                                <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                                            </div>
                                        </div>
                                        <div class="add-to-cart">
                                            <button class="add-to-cart-btn" onClick={() => handleAddToCart(product)}><i class="fa fa-shopping-cart"></i> add to cart</button>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Product