import React from 'react'
import { Route, Routes } from "react-router-dom";
import AppLayout from '../layout/AppLayout'
import Home from '../pages/Home';
import Store from '../pages/Store';
import Checkout from '../pages/Checkout';
import Product from '../pages/Product';


function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product" element={<Product />} />
                <Route path="/category/:id" element={<Store />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>

    )
}

export default MainRoute