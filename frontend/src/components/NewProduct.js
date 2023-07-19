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
import NewProductCard from './NewProductCard';

function NewProduct({ product }) {
    const sliderRef = useRef();
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState()

    useEffect(() => {
        axios.get(`${API_URL}product/new_product/`)
            .then(res => {
                setProducts(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const startAutoSlide = () => {
        sliderRef.current.slickNext(); // Go to the next slide
        setTimeout(startAutoSlide, 1000); // Start the auto-slide again after 3 seconds
    };
    const totalSlides = products?.length;
    const slidesToShow = totalSlides > 4 ? Math.min(totalSlides, 5) : totalSlides;
    const slidesToScroll = category ? 2 : 3;

    const settings = {
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 3,
        dots: true,
        autoplay: true,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: (i) => <li style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: '20px',
            marginLeft: 'auto',
            marginRight: '0',
        }}>{i === 0 ? '<' : '>'}</li>, // Custom paging with "<" and ">" icons
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
                    <NewProductTab filterCategory={setCategory} />
                    <div className="col-md-12">
                        <div className="row">
                            <div className="products-tabs">
                                <div id="tab1" className="tab-pane active">
                                    <Slider {...settings} ref={sliderRef}>
                                        {
                                            category ? products?.filter(product => product.category === category).map((product, index) => (
                                                <NewProductCard product={product} key={index} />
                                            ))
                                                :
                                                products?.map((product, index) => (
                                                    <NewProductCard product={product} key={index} />
                                                ))
                                        }
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

export default NewProduct;
