import React, { useEffect, useState } from 'react';
import NewProductTab from './NewProductTab';
import { Carousel } from '@mantine/carousel';
import axios from 'axios';
import { API_URL } from '../constants';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

function NewProduct() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: () => <li>•</li>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                },
            },
        ],
    };



    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <NewProductTab />
                    <div className="col-md-12">
                        <div className="row">
                            <div className="products-tabs">
                                <div id="tab1" className="tab-pane active">
                                    <Carousel
                                        withIndicators
                                        height="1050px"
                                        slideSize="33.333333%"
                                        slideGap="md"
                                        loop
                                        align="start"
                                        slidesToScroll={3}
                                        breakpoints={[
                                            { maxWidth: 'md', slideSize: '50%' },
                                            { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                                        ]}
                                    >
                                        <Carousel.Slide>
                                            <div className="product">
                                                <div className="product-img">
                                                    <img src="./img/product01.png" alt="" />
                                                    <div className="product-label">
                                                        <span className="sale">-30%</span>
                                                        <span className="new">NEW</span>
                                                    </div>
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <Link to='product' className="product-name">
                                                    <h3 className="product-name">
                                                        product name goes here
                                                    </h3>
                                                    </Link>
                                                    <h4 className="product-price">
                                                        $980.00{' '}
                                                        <del className="product-old-price">$990.00</del>
                                                    </h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist">
                                                            <i className="fa fa-heart-o"></i>
                                                            <span className="tooltipp">add to wishlist</span>
                                                        </button>
                                              
                                                        <button className="quick-view">
                                                            <i className="fa fa-eye"></i>
                                                            <span className="tooltipp">quick view</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn">
                                                        <i className="fa fa-shopping-cart"></i> add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </Carousel.Slide>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
