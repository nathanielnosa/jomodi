import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';

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
        <>


            <footer id="footer">

                <div className="section">

                    <div className="container mx-auto pb-10">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="mt-10">
                                    <h3 className="footer-title">About Us</h3>
                                    <Text size={22} className='mt-5'>Discover a world of online shopping convenience with us!
                                        From trending fashion to cutting-edge electronics, we offer seamless
                                        browsing, secure transactions, and doorstep delivery. Elevate your
                                        shopping experience at Jomodi - where choices meet convenience.</Text>
                                    <ul className="footer-links mt-4">
                                        <li><a href="#"><i className="fa fa-map-marker"></i>VSS Nagar, Bhubaneswar</a></li>
                                        <li><a href="#"><i className="fa fa-phone"></i>+91 1203546270</a></li>
                                        <li><a href="#"><i className="fa fa-envelope-o"></i>contact@jomodi.com</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="mt-10">
                                    <h3 className="footer-title">Categories</h3>
                                    <ul className="footer-links mt-5">
                                        {
                                            categories?.map((category) => (
                                                <li key={category.id}> <Link to={`/category/${category.id}/${category.name}`}>{category.name}</Link></li>

                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>



                            {/* <div className="clearfix visible-xs"></div> */}

                            <div className="col-md-3">
                                <div className="mt-10">
                                    <h3 className="footer-title">Information</h3>
                                    <ul className="footer-links mt-5">
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

                            {/* <div className="col-md-2 col-xs-6">
                <div className="mt-10">
                    <h3 className="footer-title">Service</h3>
                    <ul className="footer-links mt-5">
                        <li><Link to="/profile">My Account</Link></li>
                        <li><Link to="/cart">View Cart</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/order">Track My Order</Link></li>
                        <li><Link to="/help">Help Page</Link></li>
                    </ul>
                </div>
            </div> */}
                        </div>

                    </div>

                </div >

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

                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script>2023 All rights reserved | Jomodi Team<i className="fa fa-heart-o" aria-hidden="true"></i><a href="" target="_blank"></a>

                                </span>
                            </div>
                        </div>

                    </div>

                </div>

            </footer >
        </>
    )
}

export default AppFooter