import React, { useEffect, useState, useRef } from 'react';
import NewProductTab from './NewProductTab';
import { Carousel } from '@mantine/carousel';
import axios from 'axios';
import { API_URL } from '../constants';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import CardProduct from './CardProduct';
import TopSellingChip from './TopSellingChip';
import TopSellingTab from './TopSellingTab';
import TopProductCard from './TopProductCard';

function TopSelling({ product }) {
    const sliderRef = useRef();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();

    useEffect(() => {
        axios
            .get(`${API_URL}product/top_product/`)
            .then((res) => {
                setProducts(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const startAutoSlide = () => {
        sliderRef.current.slickNext(); // Go to the next slide
        setTimeout(startAutoSlide, 1000); // Start the auto-slide again after 3 seconds
    };

    const totalSlides = products?.length;
    const slidesToShow = totalSlides >= 5 ? 5 : totalSlides; // Show 5 products or less
    const slidesToScroll = Math.min(slidesToShow, 3); // Scroll 3 products at a time or less

    const settings = {
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        dots: true,
        autoplay: true,
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
        autoplaySpeed: 2000,
    };

    return (
        <div className="section">
            <div>
                <div className="row">
                    <TopSellingTab filterCategory={setCategory} />
                    <div className="col-md-12">
                        <div className="row">
                            <div className="products-tabs">
                                <div id="tab1" className="tab-pane active">
                                    <Slider {...settings} ref={sliderRef}>
                                        {category
                                            ? products
                                                .filter((product) => product.category === category)
                                                .map((product, index) => <TopProductCard key={index} product={product} />)
                                            : products.map((product, index) => <TopProductCard key={index} product={product} />)}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopSelling;
