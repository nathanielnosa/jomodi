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
    const [product2, setProduct2] = useState([]);
    const [product3, setProduct3] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}product/product_detail/`)
            .then(res => {
                console.log(res.data);
                // Randomly shuffle the products array
                const shuffledProducts = res.data.results.sort(() => 0.5 - Math.random());
                const shuffledProducts2 = res.data.results.sort(() => 0.5 - Math.random());
                const shuffledProducts3 = res.data.results.sort(() => 0.5 - Math.random());

                // Select the first 3 products from the shuffled array
                const selectedProducts = shuffledProducts.slice(0, 3);
                const selectedProducts2 = shuffledProducts2.slice(0, 3);
                const selectedProducts3 = shuffledProducts3.slice(0, 3);
                setProducts(selectedProducts);
                setProduct2(selectedProducts2);
                setProduct3(selectedProducts3);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (

        <div className="section">

            <div className="container">

                <div className="row">
                    <div className="col-md-4 col-xs-12">
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
                                                        <Link to={`/product/${product.id}/${product.name}`} style={{
                                                            textDecoration: 'none',
                                                        }}>
                                                            {product.name}
                                                        </Link></h3>
                                                    <h4 className="product-price">₹{
                                                        product.price
                                                    } <del className="product-old-price">₹{product?.cancel_price}</del></h4>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                        </Slider>

                    </div>
                    <div className="col-md-4 col-xs-12">
                        <div className="section-title">
                            <h4 className="title">New Product</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Slider {...settings}>
                            <div>
                                {
                                    product3?.map((product, index) => (
                                        <div key={index} className="product-widget">
                                            <div className="product-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">
                                                    {product?.category?.name}
                                                </p>
                                                <h3 className="product-name">
                                                    <Link to={`/product/${product.id}/${product.name}`} style={{
                                                        textDecoration: 'none',
                                                    }}>
                                                        {product.name}
                                                    </Link></h3>
                                                <h4 className="product-price">₹{
                                                    product.price
                                                } <del className="product-old-price">₹{product?.cancel_price}</del></h4>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </Slider>

                    </div>
                    <div className="col-md-4 col-xs-12">
                        <div className="section-title">
                            <h4 className="title">Popular Product</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Slider {...settings}>
                            <div>
                                {
                                    product2?.map((product, index) => (
                                        <div key={index} className="product-widget">
                                            <div className="product-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">
                                                    {product?.category?.name}
                                                </p>
                                                <h3 className="product-name">
                                                    <Link to={`/product/${product.id}/${product.name}`} style={{
                                                        textDecoration: 'none',
                                                    }}>
                                                        {product.name}
                                                    </Link></h3>
                                                <h4 className="product-price">₹{
                                                    product.price
                                                } <del className="product-old-price">₹{product?.cancel_price}</del></h4>
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