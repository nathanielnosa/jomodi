import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';

function AppFooter() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(API_URL + 'category/category/')
            .then(res => {
                console.log(res.data.results[0].id);
                setCategories(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (

        <footer id="footer">

            <div className="section">

                <div className="container">

                    <div className="row">
                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">About Us</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                <ul className="footer-links">
                                    <li><a href="#"><i className="fa fa-map-marker"></i>1734 Stonecoal Road</a></li>
                                    <li><a href="#"><i className="fa fa-phone"></i>+021-95-51-84</a></li>
                                    <li><a href="#"><i className="fa fa-envelope-o"></i>email@email.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">Categories</h3>
                                <ul className="footer-links">
                                    {
                                        categories?.map((category) => (
                                            <li key={category.id}> <Link to={`/category/${category.id}/${category.name}`}>{category.name}</Link></li>
                                          
                                        ))
                                    }                              
                                </ul>
                            </div>
                        </div>

                        <div className="clearfix visible-xs"></div>

                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">Information</h3>
                                <ul className="footer-links">
                                    <li><Link to="/about-us">About Us</Link></li>
                                    <li><Link to="/contact-us">Contact Us</Link></li>
                                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                    <li><Link to="/order-return">Orders and Returns</Link></li>
                                    <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                                  
                                    
                                    {/* <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Orders and Returns</a></li>
                                    <li><a href="#">Terms & Conditions</a></li> */}
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-3 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-title">Service</h3>
                                <ul className="footer-links">
                                    <li><Link to="/profile">My Account</Link></li>
                                    <li><Link to="/cart">View Cart</Link></li>
                                    <li><Link to="/wishlist">Wishlist</Link></li>
                                    <li><Link to="/order">Track My Order</Link></li>
                                    <li><Link to="/help">Help Page</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div id="bottom-footer" className="section">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <ul className="footer-payments">
                                <li><a href="#"><i className="fa fa-cc-visa"></i></a></li>
                                <li><a href="#"><i className="fa fa-credit-card"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-paypal"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-mastercard"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-discover"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-amex"></i></a></li>
                            </ul>
                            <span className="copyright">

                                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>

                            </span>
                        </div>
                    </div>

                </div>

            </div>

        </footer>
    )
}

export default AppFooter