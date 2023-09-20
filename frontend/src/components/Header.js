import React from 'react';
import WishCart from './WishCart';
import Search from './Search';
import NavCat from './NavCat';
import TopHeader from './TopHeader';
import { Link } from 'react-router-dom';
import { Image } from '@mantine/core';

function Header() {
    return (
        <>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                        <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>

            <header
                className="site-navbar js-sticky-header site-navbar-target"
                role="banner"
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-3 col-xl-2">
                            <h1 className="mb-0 site-logo">
                                <a href="index.html">Jomodi<span className="text-primary">.</span> </a>
                            </h1>
                        </div>

                        <div className="col-6 col-md-2 col-xl-4">
                            <form className="search-form">
                                <input type="text" className="form-control" placeholder="Search" />
                                {/* <!-- <button type="submit" className="search-button"><i className="icon-search"></i></button> --> */}
                            </form>
                        </div>
                        <div className="col-4 col-md-5 d-none d-xl-block">
                            <nav
                                className="site-navigation position-relative text-right"
                                role="navigation"
                            >
                                <ul
                                    className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block"
                                >
                                    <li className="has-children"><a href="#home-section" className="nav-link">Download</a>
                                        <ul className="dropdown">
                                            <li>
                                                <Image src="img/playstore.jpg" />
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#home-section" className="nav-link">Become a supplier</a></li>
                                    <li className="has-children">
                                        <a href="#about-section" className="nav-link">Profile</a>
                                        <ul className="dropdown">
                                            <li><a href="#team-section" className="nav-link">Login/Signup</a></li>
                                            <li>
                                                <a href="#pricing-section" className="nav-link">WishList</a>
                                            </li>
                                            <li><a href="#faq-section" className="nav-link">Order</a></li>
                                            <li>
                                                <a href="#gallery-section" className="nav-link">Profile</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#contact-section" className="nav-link">Cart</a></li>
                                </ul>
                            </nav>
                        </div>

                        <div
                            className="col-3 d-inline-block d-xl-none ml-md-0 py-3"
                            style={{ position: 'relative', top: '3px' }}
                        >
                            <a href="/" className="site-menu-toggle js-menu-toggle float-right"
                            ><span className="icon-menu h3"></span
                            ></a>
                        </div>
                    </div>
                </div>
            </header>

            <div className="hero"></div>
            <NavCat />
        </>
    );
}

export default Header;