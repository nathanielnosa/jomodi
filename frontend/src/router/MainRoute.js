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
import Brand from '../pages/Brand';
import Order from '../pages/Order';
import OrderSuccess from '../pages/OrderSuccess';
import HelpPage from '../pages/HelpPage';
import OrderReturn from '../pages/OrderReturn';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TAC from '../pages/TAC';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import OTPVerification from '../pages/OTPVerification';
import ProfilePage from '../pages/ProfilePage';
import OrderDetailPage from '../pages/OrderDetails';
import OrderProductSummary from '../pages/OrderProductSummary';
import { useAuth } from '../context/auth-context';

function MainRoute() {
    const { isAuthenticated } = useAuth();
    const authenticate = localStorage.getItem('authenticated');

    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/store" element={<Store />} />

                <Route
                    path="/wishlist"
                    element={
                        <PrivateRoute user={isAuthenticated} redirect="/wishlist">
                            <WishListPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute user={isAuthenticated} redirect="/profile">
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/order"
                    element={
                        <PrivateRoute user={isAuthenticated} redirect="/order">
                            <Order />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/order-success"
                    element={
                        <PrivateRoute user={isAuthenticated}>
                            <OrderSuccess />
                        </PrivateRoute>
                    }
                />
                <Route path='/order-product-summary' element={<OrderProductSummary />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/wishlistcheckout' element={<WishListCheckOut />} />
                <Route path='/product-checkout/:id/:slug' element={<ProductCheckout />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id/:slug" element={<Product />} />
                <Route path="/category/:id/:slug" element={<Category />} />
                <Route path="search/:keyword/:categoryid" element={<SearchPage />} />
                <Route path="/brand/:id/:slug" element={<Brand />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/order-return" element={<OrderReturn />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TAC />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path='/otp-verification' element={<OTPVerification />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/order-details" element={<OrderDetailPage/>}></Route>
            </Route>
        </Routes>

    )
}

export default MainRoute