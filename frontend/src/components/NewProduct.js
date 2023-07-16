import React, { useEffect, useState } from 'react';
import NewProductTab from './NewProductTab';
import { Carousel } from '@mantine/carousel';
import axios from 'axios';
import { API_URL } from '../constants';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import CardProduct from './CardProduct';

function NewProduct({product}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}product/product_detail/`)
            .then(res => {
                setProducts(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
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
                                        {products?.map((product, index) => (
                                            <Carousel.Slide key={index}>
                                                <CardProduct product={product} />
                                            </Carousel.Slide>
                                        ))
                                        }
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
