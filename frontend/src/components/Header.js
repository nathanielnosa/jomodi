import React from 'react'
import WishCart from './WishCart'
import Search from './Search'
import NavCat from './NavCat'
import TopHeader from './TopHeader'

function Header() {
    return (
        <div>
            <header>
                <TopHeader />
                <div id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="header-logo">
                                    <a href="#" className="logo">
                                        <img src="./img/logo.png" alt="" />
                                    </a>
                                </div>
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