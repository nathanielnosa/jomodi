import React from 'react'
import { Link } from 'react-router-dom'

function WishCart() {
    return (
        <div className="col-md-3 clearfix">
            <div className="header-ctn">

                <div>
                    <a href="#">
                        <i className="fa fa-heart-o"></i>
                        <span>Your Wishlist</span>
                        <div className="qty">2</div>
                    </a>
                </div>

                <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-shopping-cart"></i>
                        <span>Your Cart</span>
                        <div className="qty">3</div>
                    </a>
                    <div className="cart-dropdown">
                        <div className="cart-list">
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product01.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price"><span className="qty">1x</span>$980.00</h4>
                                </div>
                                <button className="delete"><i className="fa fa-close"></i></button>
                            </div>

                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product02.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price"><span className="qty">3x</span>$980.00</h4>
                                </div>
                                <button className="delete"><i className="fa fa-close"></i></button>
                            </div>
                        </div>
                        <div className="cart-summary">
                            <small>3 Item(s) selected</small>
                            <h5>SUBTOTAL: $2940.00</h5>
                        </div>
                        <div className="cart-btns">
                            <a href="#">View Cart</a>
                            <Link to='/checkout'>Checkout  <i className="fa fa-arrow-circle-right"></i></Link>
                            {/* <a href="#">Checkout  <i className="fa fa-arrow-circle-right"></i></a> */}
                        </div>
                    </div>
                </div>


                <div className="menu-toggle">
                    <a href="#">
                        <i className="fa fa-bars"></i>
                        <span>Menu</span>
                    </a>
                </div>


            </div>
        </div>
    )
}

export default WishCart