import React from 'react'
import WishCart from './WishCart'
import Search from './Search'
import NavCat from './NavCat'
import TopHeader from './TopHeader'
import { Link } from 'react-router-dom'


function Header() {

    return (
        <div>
            <header>
                <TopHeader />
                <div id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Link to="/">
                                    <div className="header-logo">
                                        <div className="logo">
                                            <img src="./img/logo.png" alt="" />
                                        </div>
                                    </div>

                                </Link>

                            </div>
                            <Search />
                            <WishCart />
                        </div>
                    </div>
                </div>
            </header>
            <NavCat />
        </div>
    )
}

export default Header