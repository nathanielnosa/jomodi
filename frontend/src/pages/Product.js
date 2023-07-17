import React, { useEffect, useState } from 'react'
import { Carousel } from '@mantine/carousel';
import Slider from 'react-slick';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';


function Product() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const addQuantity = () => {
        setQuantity(quantity + 1);
    };

    const subtractQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

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
        <div>

            <div id="breadcrumb" className="section">

                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumb-tree">
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
                                <li className="active">
                                    {
                                        product?.name
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>



            <div className="section">

                <div className="container">

                    <div className="row">

                        <div className="col-md-5 col-md-push-2">

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



                        <div className="col-md-2  col-md-pull-5">

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



                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">
                                    {
                                        product?.name
                                    }
                                </h2>
                                <div>
                                    <div className="product-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div>
                                    <a className="review-link" href="#">10 Review(s) | Add your review</a>
                                </div>
                                <div>
                                    <h3 className="product-price">${product?.price}0 <del className="product-old-price">${product?.cancel_price}</del></h3>
                                    <span className="product-available">In Stock</span>
                                </div>
                                <p style={{
                                    whiteSpace: "wrap",
                                    wordWrap: "break-word"
                                }}>
                                    {product?.description}
                                </p>

                                <div className="product-options">
                                    <label>
                                        Size
                                        <select className="input-select">
                                            <option value="0">X</option>
                                        </select>
                                    </label>
                                    <label>
                                        Color
                                        <select className="input-select">
                                            <option value="0">Red</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="add-to-cart">
                                    <div className="qty-label">
                                        Qty
                                        <div className="input-number">
                                            <input type="number" 
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            />
                                            <span className="qty-up"
                                            onClick={addQuantity}
                                            >+</span>
                                            <span className="qty-down"
                                            onClick={subtractQuantity}
                                            >-</span>
                                        </div>
                                    </div>
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}><i className="fa fa-shopping-cart"></i> add to cart</button>
                                </div>

                                <ul className="product-btns">
                                    <li><i className="fa fa-heart-o"></i> add to wishlist</li>
                                  
                                </ul>

                                <ul className="product-links">
                                    <li>Category:</li>
                                    <li>
                                        {
                                            product?.category?.name
                                        }
                                    </li>
                                    <li>
                                        {
                                            product?.brand?.name
                                        }
                                    </li>
                                </ul>


                            </div>
                        </div>


                        <div className="col-md-12">
                            <div id="product-tab">

                                <ul className="tab-nav">
                                    <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Details</a></li>
                                    {/* <li><a data-toggle="tab" href="#tab3">Reviews (3)</a></li> */}
                                </ul>

                                <div className="tab-content">

                                    <div id="tab1" className="tab-pane fade in active">
                                        <div className="row">
                                            <div className="col-md-12">
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

                                    <div id="tab2" className="tab-pane fade in">
                                        <div className="row">
                                            <div className="col-md-12">
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

            <div className="section">

                <div className="container">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h3 className="title">Related Products</h3>
                            </div>
                        </div>

                        {
                            relatedProducts.map((product, index) => (

                                <div className="col-md-3 col-xs-6">
                                    <div className="product">
                                        <div className="product-img">
                                            <img src={product.image} alt="" />
                                            <div className="product-label">
                                                <span className="sale">-30%</span>
                                            </div>
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">
                                                {
                                                    product?.category?.name
                                                }
                                            </p>
                                            <h3 className="product-name">
                                                <Link to={`/product/${product?.id}`}>
                                                    {product?.name}
                                                </Link></h3>
                                            <h4 className="product-price">${product?.price} <del className="product-old-price">${product?.cancel_price}</del></h4>
                                            <div className="product-rating">
                                            </div>
                                            <div className="product-btns">
                                                <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
                                                <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
                                            </div>
                                        </div>
                                        <div className="add-to-cart">
                                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}><i className="fa fa-shopping-cart"></i> add to cart</button>
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