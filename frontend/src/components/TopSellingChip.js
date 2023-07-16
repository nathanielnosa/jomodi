import React from 'react'
import { Carousel } from '@mantine/carousel';

function TopSellingChip() {
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

                        <Carousel
                            withIndicators
                            height="100%"
                            slideSize="100%"
                            slideGap="md"
                            loop
                            align="start"
                            breakpoints={[
                                { maxWidth: 'md', slideSize: '50%' },
                                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                            ]}
                        >
                            <Carousel.Slide>
                                <div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product07.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product08.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product09.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>

                                </div>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product01.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product02.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product03.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>

                                </div>

                            </Carousel.Slide>


                        </Carousel>
                    </div>
                    <div className="col-md-4 col-xs-6">
                        <div className="section-title">
                            <h4 className="title">Top selling</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Carousel
                            withIndicators
                            height="100%"
                            slideSize="100%"
                            slideGap="md"
                            loop
                            align="start"
                            breakpoints={[
                                { maxWidth: 'md', slideSize: '50%' },
                                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                            ]}
                        >
                            <Carousel.Slide>
                                <div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product07.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product08.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product09.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>

                                </div>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product01.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product02.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product03.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>

                                </div>

                            </Carousel.Slide>


                        </Carousel>
                    </div>
                    <div className="col-md-4 col-xs-6">
                        <div className="section-title">
                            <h4 className="title">Top selling</h4>
                            <div className="section-nav">
                                <div id="slick-nav-3" className="products-slick-nav"></div>
                            </div>
                        </div>

                        <Carousel
                            withIndicators
                            height="100%"
                            slideSize="100%"
                            slideGap="md"
                            loop
                            align="start"
                            breakpoints={[
                                { maxWidth: 'md', slideSize: '50%' },
                                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                            ]}
                        >
                            <Carousel.Slide>
                                <div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product07.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product08.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product09.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>

                                </div>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product01.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product02.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>



                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product03.png" alt="" />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>

                                </div>

                            </Carousel.Slide>


                        </Carousel>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TopSellingChip