import React from 'react'
import { Route, Routes } from "react-router-dom";
import AppLayout from '../layout/AppLayout'
import Home from '../pages/Home';
import Store from '../pages/Store';
import Checkout from '../pages/Checkout';
import Product from '../pages/Product';
import Category from '../pages/Category';
import SearchPage from '../pages/SearchPage';
import WishListPage from '../pages/WishListPage';
import CartPage from '../pages/CartPage';
import WishListCheckOut from '../pages/WishListCheckOut';
import ProductCheckout from '../pages/ProductCheckout';

function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<WishListPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id/:slug" element={<Product />} />
                <Route path="/category/:id/:slug" element={<Category />} />
                <Route path="search/:keyword/:categoryid" element={<SearchPage />} />
                <Route path="/wishlistcheckout" element={<WishListCheckOut />} />
                <Route path="/product-checkout/:id/:slug" element={<ProductCheckout />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>

    )
}

export default MainRoute