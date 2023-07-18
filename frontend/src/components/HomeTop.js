import React from 'react'
import { Link } from 'react-router-dom'

function HomeTop() {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-xs-12">
                        <Link to='store' className="cta-btn">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src="./img/shop01.png" alt="" />
                                </div>
                                <div className="shop-body">
                                    <h3>Laptop<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <Link to='store' className="cta-btn">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src="./img/shop03.png" alt="" />
                                </div>
                                <div className="shop-body">
                                    <h3>Accessories<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </Link>

                    </div>
                    <div className="col-md-4 col-xs-12">
                        <Link to='store' className="cta-btn">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src="./img/shop02.png" alt="" />
                                </div>
                                <div className="shop-body">
                                    <h3>Cameras<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default HomeTop