import React, {useEffect }from 'react';
import NewProductTab from './NewProductTab';
import Slider from 'react-slick';


function NewProduct() {
    
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <NewProductTab />
                    <div className="col-md-12">
                        <div className="row">
                            <div className="products-tabs">
                                <div id="tab1" className="tab-pane active">
                                    <Slider>
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
                                                <h3 className="product-name">
                                                    <a href="#">product name goes here</a>
                                                </h3>
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
                                                    <button className="add-to-compare">
                                                        <i className="fa fa-exchange"></i>
                                                        <span className="tooltipp">add to compare</span>
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

                                        <div className="product">
                                            <div className="product-img">
                                                <img src="./img/product02.png" alt="" />
                                                <div className="product-label">
                                                    <span className="new">NEW</span>
                                                </div>
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">Category</p>
                                                <h3 className="product-name">
                                                    <a href="#">product name goes here</a>
                                                </h3>
                                                <h4 className="product-price">
                                                    $980.00{' '}
                                                    <del className="product-old-price">$990.00</del>
                                                </h4>
                                                <div className="product-rating">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o"></i>
                                                </div>
                                                <div className="product-btns">
                                                    <button className="add-to-wishlist">
                                                        <i className="fa fa-heart-o"></i>
                                                        <span className="tooltipp">add to wishlist</span>
                                                    </button>
                                                    <button className="add-to-compare">
                                                        <i className="fa fa-exchange"></i>
                                                        <span className="tooltipp">add to compare</span>
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

                                        <div className="product">
                                            <div className="product-img">
                                                <img src="./img/product03.png" alt="" />
                                                <div className="product-label">
                                                    <span className="sale">-30%</span>
                                                </div>
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">Category</p>
                                                <h3 className="product-name">
                                                    <a href="#">product name goes here</a>
                                                </h3>
                                                <h4 className="product-price">
                                                    $980.00{' '}
                                                    <del className="product-old-price">$990.00</del>
                                                </h4>
                                                <div className="product-rating"></div>
                                                <div className="product-btns">
                                                    <button className="add-to-wishlist">
                                                        <i className="fa fa-heart-o"></i>
                                                        <span className="tooltipp">add to wishlist</span>
                                                    </button>
                                                    <button className="add-to-compare">
                                                        <i className="fa fa-exchange"></i>
                                                        <span className="tooltipp">add to compare</span>
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

                                        <div className="product">
                                            <div className="product-img">
                                                <img src="./img/product04.png" alt="" />
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">Category</p>
                                                <h3 className="product-name">
                                                    <a href="#">product name goes here</a>
                                                </h3>
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
                                                    <button className="add-to-compare">
                                                        <i className="fa fa-exchange"></i>
                                                        <span className="tooltipp">add to compare</span>
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

                                        <div className="product">
                                            <div className="product-img">
                                                <img src="./img/product05.png" alt="" />
                                            </div>
                                            <div className="product-body">
                                                <p className="product-category">Category</p>
                                                <h3 className="product-name">
                                                    <a href="#">product name goes here</a>
                                                </h3>
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
                                                    <button className="add-to-compare">
                                                        <i className="fa fa-exchange"></i>
                                                        <span className="tooltipp">add to compare</span>
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
