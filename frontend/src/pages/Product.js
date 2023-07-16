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
        <>

            <div id="breadcrumb" class="section">

                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumb-tree">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">All Categories</a></li>
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
                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
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

                                <ul class="product-links">
                                    <li>Share:</li>
                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                    <li><a href="#"><i class="fa fa-envelope"></i></a></li>
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

                                    <div id="tab3" class="tab-pane fade in">
                                        <div class="row">

                                            {/* <div class="col-md-3">
                                                <div id="rating">
                                                    <div class="rating-avg">
                                                        <span>4.5</span>
                                                        <div class="rating-stars">
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star-o"></i>
                                                        </div>
                                                    </div>
                                                    <ul class="rating">
                                                        <li>
                                                            <div class="rating-stars">
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                            </div>
                                                            <div class="rating-progress">
                                                                <div style={{
                                                                    width: "80%"
                                                                }}></div>
                                                            </div>
                                                            <span class="sum">3</span>
                                                        </li>
                                                        <li>
                                                            <div class="rating-stars">
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star-o"></i>
                                                            </div>
                                                            <div class="rating-progress">
                                                                <div style={{
                                                                    width: "60%"
                                                                }}></div>
                                                            </div>
                                                            <span class="sum">2</span>
                                                        </li>
                                                        <li>
                                                            <div class="rating-stars">
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star-o"></i>
                                                                <i class="fa fa-star-o"></i>
                                                            </div>
                                                            <div class="rating-progress">
                                                                <div></div>
                                                            </div>
                                                            <span class="sum">0</span>
                                                        </li>
                                                        <li>
                                                            <div class="rating-stars">
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star-o"></i>
                                                                <i class="fa fa-star-o"></i>
                                                                <i class="fa fa-star-o"></i>
                                                            </div>
                                                            <div class="rating-progress">
                                                                <div></div>
                                                            </div>
                                                            <span class="sum">0</span>
                                                        </li>
                                                        <li>
                                                            <div class="rating-stars">
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star-o"></i>
                                                                <i class="fa fa-star-o"></i>
                                                                <i class="fa fa-star-o"></i>
                                                                <i class="fa fa-star-o"></i>
                                                            </div>
                                                            <div class="rating-progress">
                                                                <div></div>
                                                            </div>
                                                            <span class="sum">0</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div> */}

                                            {/* <div class="col-md-6">
                                                <div id="reviews">
                                                    <ul class="reviews">
                                                        <li>
                                                            <div class="review-heading">
                                                                <h5 class="name">John</h5>
                                                                <p class="date">27 DEC 2018, 8:0 PM</p>
                                                                <div class="review-rating">
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div class="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="review-heading">
                                                                <h5 class="name">John</h5>
                                                                <p class="date">27 DEC 2018, 8:0 PM</p>
                                                                <div class="review-rating">
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div class="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="review-heading">
                                                                <h5 class="name">John</h5>
                                                                <p class="date">27 DEC 2018, 8:0 PM</p>
                                                                <div class="review-rating">
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star"></i>
                                                                    <i class="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div class="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul class="reviews-pagination">
                                                        <li class="active">1</li>
                                                        <li><a href="#">2</a></li>
                                                        <li><a href="#">3</a></li>
                                                        <li><a href="#">4</a></li>
                                                        <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div> */}

                                            {/* <div class="col-md-3">
                                                <div id="review-form">
                                                    <form class="review-form">
                                                        <input class="input" type="text" placeholder="Your Name" />
                                                        <input class="input" type="email" placeholder="Your Email" />
                                                        <textarea class="input" placeholder="Your Review"></textarea>
                                                        <div class="input-rating">
                                                            <span>Your Rating: </span>
                                                            <div class="stars">
                                                                <input id="star5" name="rating" value="5" type="radio" /><label for="star5"></label>
                                                                <input id="star4" name="rating" value="4" type="radio" /><label for="star4"></label>
                                                                <input id="star3" name="rating" value="3" type="radio" /><label for="star3"></label>
                                                                <input id="star2" name="rating" value="2" type="radio" /><label for="star2"></label>
                                                                <input id="star1" name="rating" value="1" type="radio" /><label for="star1"></label>
                                                            </div>
                                                        </div>
                                                        <button class="primary-btn">Submit</button>
                                                    </form>
                                                </div>
                                            </div> */}

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
                                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }




                        <div class="clearfix visible-sm visible-xs"></div>








                    </div>

                </div>

            </div>

        </>
    )
}

export default Product