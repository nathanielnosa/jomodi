import React, {useEffect, useState} from 'react'
import { Carousel } from '@mantine/carousel';
import { API_URL } from '../constants'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function TopSellingChip() {

    const settings = {
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

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}product/product_detail/`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (

        <div className="section">

            <div className="container">

                <div className="row">
                    <div className="col-md-4 col-xs-6">
                        <div className="section-title">
                            <h4 className="title">Top selling</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Slider {...settings}>
                                <div>
                                    {
                                        products?.map((product, index) => (
                                            <div key={index} className="product-widget">
                                                <div className="product-img">
                                                    <img src={product.image} alt="" />
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">
                                                        {product?.category?.name}
                                                    </p>
                                                    <h3 className="product-name">
                                                        <Link to={`/product/${product.id}`}>
                                                            {product.name}
                                                        </Link></h3>
                                                    <h4 className="product-price">$980.00 <del className="product-old-price">${product.price}</del></h4>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                        </Slider>

                    </div>
                    <div className="col-md-4 col-xs-6">
                        <div className="section-title">
                            <h4 className="title">Top selling</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Slider {...settings}>
                            <div>
                                {
                                    products?.map((product, index) => (
                                        <div key={index} className="product-widget">
                                            <div className="product-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">
                                                    {product?.category?.name}
                                                </p>
                                                <h3 className="product-name">
                                                    <Link to={`/product/${product.id}`}>
                                                        {product.name}
                                                    </Link></h3>
                                                <h4 className="product-price">$980.00 <del className="product-old-price">${product.price}</del></h4>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </Slider>

                    </div>
                    <div className="col-md-4 col-xs-6">
                        <div className="section-title">
                            <h4 className="title">Top selling</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Slider {...settings}>
                            <div>
                                {
                                    products?.map((product, index) => (
                                        <div key={index} className="product-widget">
                                            <div className="product-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">
                                                    {product?.category?.name}
                                                </p>
                                                <h3 className="product-name">
                                                    <Link to={`/product/${product.id}`}>
                                                        {product.name}
                                                    </Link></h3>
                                                <h4 className="product-price">$980.00 <del className="product-old-price">${product.price}</del></h4>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </Slider>

                    </div>
                   
                </div>

            </div>

        </div>
    )
}

export default TopSellingChip