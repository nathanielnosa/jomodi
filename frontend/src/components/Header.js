import React from 'react';
import WishCart from './WishCart';
import Search from './Search';
import NavCat from './NavCat';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className="cont cont-1">
                <div className="flex-container">
                    <div className="flex-col-1">
                        <h2 className="logo">Jomodi</h2>
                    </div>
                    <div className="flex-col-2">
                        <div id="search" className=" search">
                            <button type="button" className="button-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                            <input id="filter_name" type="text" nae="search" value="" placeholder="Try Saree, Kurti or Search by Product Code" className="form-cont"/>
                        </div>

                    </div>
                    <div className="flex-col-3">
                    <div className="flex-cont">
                        <div className="">
                          <nav className="navbarr-main navbar-expnd-lg">
                            <div className="" id="navbarTogglerDemo01">
                              <ul className=" nav-links">
                                <li className="nav-item">
                                  <div className="desktop-item">
                                    <a className="" href="#"> 
                                      <span className="">
                                        <i className="fa-solid fa-mobile icon"></i>                           
                                      </span>
                                       Download </a>
                                  </div>
                                    <div className="megaa-box">
                                      <div className="content">
                                        <div className="flex-cnt">
                                          <div className="">
                                            <header className="sub-headerr">Download from</header>
                                            <ul className="mega-linkss">
                                            <li><img src="/img/playstore.jpg" alt="" width="80%" style={{marginTop: "-10px", marginLeft: "34px"}} /></li>
                                            </ul>
                                          </div>           
                                        </div>
                                   </div>
                                    </div>
                                </li>
                              </ul>
                            </div>
                        </nav>
                        </div>
                        <div className="nav-linksss line">
                            <div className="vl">
                              <li>
                                <a>Become a Supplier</a>
                              </li>
                              </div>
                        </div>
                    </div>
                    </div>
                    <div className="flex-col-4 linee">
                    <div className="flex-cont">
                      <div className="">
                        <nav className="navbarr-main">
                          <div className="">
                            <ul className=" nav-linkest">
                              <li className="nav-item">
                                <div className="desktop-item">
                                  <a className="" href="#"> 
                                    <i className="fa-regular fa-user"></i>
                                <p>Profile</p>
                               </a>
                                </div>
                                  <div className="megaa-box">
                                    <div className="content">
                                      <div className="">
                                        <div className="sub-headerrr">
                                          <ul className="mega-linkss">
                                            <li><a className="">Hello User</a></li>
                                            <li><a className="">To access your Jomodi account</a></li>
                                            <li><button type="button" className="sign-up"><a className="sign" href="">Signup / Login</a></button></li>
                                           
                                            <li>
                                              <a className="dropdown-item" href="">
                                              <span>
                                                <i className="fa-solid fa-bag-shopping"></i>
                                                  My orders
                                                </span>
                                              </a>
                                             </li>
                                          </ul>
                                        </div>           
                                      </div>
                                 </div>
                                  </div>
                              </li>
                            </ul>
                          </div>
                      </nav>
                      </div>
                        <div className="nav-linksss">
                            <div className="vll" style={{fontSize: "16px"}}>
                              <i className="fa-solid fa-cart-shopping"></i>
                                <p>Cart</p>
                              </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
            <div className="cnt cont-2">

                <nav className="navbarr navbar-expand-lg">
                    <div className="" id="navbarTogglerDemo01">
                        <ul className="nav-links">
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Women Ethnic</a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont">
                                            <div className="">
                                                <header className="sub-header">All Women Ethnic</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">View All</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Sarees</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All Sarees</a></li>
                                                        <li><a href="#">Silk Sarees</a></li>
                                                        <li><a href="#">Cotton Silk Sarees</a></li>
                                                        <li><a href="#">Cotton Sarees</a></li>
                                                        <li><a href="#">Georgette Sarees</a></li>
                                                        <li><a href="#">Chiffon Sarees</a></li>
                                                        <li><a href="#">Satin Sarees</a></li>
                                                        <li><a href="#">Embroidered Sarees</a></li>

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Kurtis</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All Kurtis</a></li>
                                                        <li><a href="#">Anarkali Kurtis</a></li>
                                                        <li><a href="#">Rayon Kurtis</a></li>
                                                        <li><a href="#">Embroidered Kurtis</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Kurta Sets</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#" className="pl-5">All Kurta Sets</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Suits & Dress Material</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All Suits & Dress Materials</a></li>
                                                        <li><a href="#">Cotton Suits</a></li>
                                                        <li><a href="#">Embroidered Suits</a></li>
                                                        <li><a href="#">Chanderi Suits</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">

                                                <div className="rw">
                                                    <header className="sub-header">Other Ethnic</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Blouses</a></li>
                                                        <li><a href="#">Dupattas</a></li>
                                                        <li><a href="#">Lehanga</a></li>
                                                        <li><a href="#">Gown</a></li>
                                                        <li><a href="#">Ethnic Bottomwear</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Western Women </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont">
                                            <div className="">
                                                <header className="sub-header">Topwear</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">Tops</a></li>
                                                    <li className="pr-5"><a href="#">Dresses</a></li>
                                                    <li className="pr-5"><a href="#">Sweaters</a></li>
                                                    <li className="pr-5"><a href="#">Jumpsuits</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Bottomwears</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Jeans</a></li>
                                                        <li><a href="#">Jeggings </a></li>
                                                        <li><a href="#">Palazzos</a></li>
                                                        <li><a href="#">Shorts</a></li>
                                                        <li><a href="#">Skirts</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Innerwear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Bra</a></li>
                                                        <li><a href="#">Briefs </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Sleepwear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#" className="pl-5">Nightsuits</a></li>
                                                        <li><a href="#" className="pl-5">Babydolls</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Men</a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont ">
                                            <div className="">
                                                <header className="sub-header">Top Wear</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">All Top Wear</a></li>
                                                    <li className="pr-5"><a href="#">Tshirts</a></li>
                                                    <li className="pr-5"><a href="#">Shirts</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Bottom Wear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Track Pants</a></li>
                                                        <li><a href="#">Jeans</a></li>
                                                        <li><a href="#"> Trousers</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Men Accessories</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All Men Accessories</a></li>
                                                        <li><a href="#">Belts</a></li>
                                                        <li><a href="#">Wallets</a></li>
                                                        <li><a href="">Jewellry</a></li>
                                                        <li><a href="#">Sunglasses</a></li>
                                                        <li><a href="#">Bags</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Men Footwear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#" className="pl-5">Casual Shoes</a></li>
                                                        <li><a href="#" className="pl-5">Sports Shoes</a></li>
                                                        <li><a href="#" className="pl-5">Sandals</a></li>
                                                        <li><a href="#" className="pl-5">Formal Shoes</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Ethnic Wear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Men Kurtas</a></li>
                                                        <li><a href="#">Ethnic Jackets </a></li>
                                                        <li><a href="#">Embroidered Suits</a></li>
                                                        <li><a href="#">Chanderi Suits</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">

                                                <div className="rw">
                                                    <header className="sub-header">Inner & Sleep Wear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All Inner & Sleep Wear</a></li>
                                                        <li><a href="#">Vests</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Kids </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont ">
                                            <div className="">
                                                <header className="sub-header">Boys & Girls 2+ Years</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">Dresses</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Infant 0-2 Years</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Rompers </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Toys & Accessories</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Soft Toys</a></li>
                                                        <li><a href="#">Footwear </a></li>
                                                        <li><a href="#">Stationery</a></li>
                                                        <li><a href="#">Watches</a></li>
                                                        <li><a href="#">Bags</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Baby Care</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#" className="pl-5">All Baby Care</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Home & Kitchen </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont">
                                            <div className="">
                                                <header className="sub-header">Home Decor</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">All Home Decor</a></li>
                                                    <li className="pr-5"><a href="#">Stickers</a></li>
                                                    <li className="pr-5"><a href="#">Showpieces</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored ">
                                                <div className="rw">
                                                    <header className="sub-header">Kitchen & Dining</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Kitchen Storage </a></li>
                                                        <li><a href="#">Cookware & Bakeware </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Home Furnishing</header>
                                                    <ul className="mega-links">

                                                        <li><a href="#">Bedsheets</a></li>
                                                        <li><a href="#">Curtains & Sheers </a></li>
                                                        <li><a href="#"> Cushions & Cushion Covers</a></li>
                                                        <li><a href="#">Mattress Protectors</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Beauty & Health </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont ">
                                            <div className="">
                                                <header className="sub-header"> Make up</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">Face</a></li>
                                                    <li className="pr-5"><a href="#">Eyes</a></li>
                                                    <li className="pr-5"><a href="#">Nails</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored ">
                                                <div className="rw">
                                                    <header className="sub-header">Wellness</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Sanitizers </a></li>
                                                        <li><a href="#">Oral Care </a></li>
                                                        <li><a href="#">Feminine Hygiene </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Home Furnishing</header>
                                                    <ul className="mega-links">

                                                        <li><a href="#">Bedsheets</a></li>
                                                        <li><a href="#">Curtains & Sheers </a></li>
                                                        <li><a href="#"> Cushions & Cushion Covers</a></li>
                                                        <li><a href="#">Mattress Protectors</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Jewellry & Accessory </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont ">
                                            <div className="">
                                                <header className="sub-header">Jewellery</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">Jewellery Set</a></li>
                                                    <li className="pr-5"><a href="#">Earrings</a></li>
                                                    <li className="pr-5"><a href="#">Mangalsutras</a></li>
                                                    <li className="pr-5"><a href="#">Studs</a></li>
                                                    <li ><a href="#">Bangles</a></li>
                                                    <li className="pr-5"><a href="#">Necklaces</a></li>
                                                    <li className="pr-5"><a href="#">Rings</a></li>
                                                    <li className="pr-5"><a href="#">Anklets</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored ">
                                                <div className="rw">
                                                    <header className="sub-header">Women Accessory</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Watches </a></li>
                                                        <li><a href="#">Hair Accessories </a></li>
                                                        <li><a href="#">Socks </a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="">
                                                <header className="sub-header">Jewellery</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">Jewellery Set</a></li>
                                                    <li className="pr-5"><a href="#">Earrings</a></li>
                                                    <li className="pr-5"><a href="#">Mangalsutras</a></li>
                                                    <li className="pr-5"><a href="#">Studs</a></li>
                                                    <li ><a href="#">Bangles</a></li>
                                                    <li className="pr-5"><a href="#">Necklaces</a></li>
                                                    <li className="pr-5"><a href="#">Rings</a></li>
                                                    <li className="pr-5"><a href="#">Anklets</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="desktop-item">Bags & Footwear </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont ">
                                            <div className="">
                                                <header className="sub-header">Men Footwear</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">Sports Shoes</a></li>
                                                    <li className="pr-5"><a href="#">Casual Shoes</a></li>
                                                    <li className="pr-5"><a href="#">Formal Shoes</a></li>
                                                    <li className="pr-5"><a href="#">Sandals</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored ">
                                                <div className="rw">
                                                    <header className="sub-header">Women Footwear</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">Flats</a></li>
                                                        <li><a href="#">Bellies </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="rw">
                                                    <header className="sub-header">Women's bags</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All women bag</a></li>
                                                        <li><a href="#">Handbag </a></li>
                                                        <li><a href="#">Clutches </a></li>
                                                        <li><a href="#">Slingbags </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cont-colored">
                                                <div className="rw">
                                                    <header className="sub-header">Men bags</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#" className="pl-5">All men bags</a></li>
                                                        <li><a href="#" className="pl-5">Wallet</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="desktop-item">
                                    <a href="#" className="">Electronics </a>
                                </div>
                                <div className="mega-box">
                                    <div className="content">
                                        <div className="flex-cont ">
                                            <div className="">
                                                <header className="sub-header">Mobile & Accessories</header>
                                                <ul className="mega-links">
                                                    <li className="pr-5"><a href="#">All Mobile & Accessories</a></li>
                                                    <li className="pr-5"><a href="#">Smartwatches</a></li>
                                                    <li className="pr-5"><a href="#">Mobile Holders</a></li>
                                                    <li className="pr-5"><a href="#">Mobile cases and covers</a></li>
                                                </ul>
                                            </div>
                                            <div className="cont-colored ">
                                                <div className="rw">
                                                    <header className="sub-header">Appliances</header>
                                                    <ul className="mega-links">
                                                        <li><a href="#">All Appliances </a></li>
                                                        <li><a href="#"> Grooming </a></li>
                                                        <li><a href="#">Home Appliances </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        
    );
}

export default Header;
