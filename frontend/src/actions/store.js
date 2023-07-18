import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import wishReducer from './wishReducer';

// Retrieve cart items from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const wishlistItemsFromStorage = localStorage.getItem('wishlist')
    ? JSON.parse(localStorage.getItem('wishlist'))
    : [];

// Initialize the initial state of the cart with cart items from local storage
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    wishlist: {
        wishlistItems: wishlistItemsFromStorage,
    },
};

const rootReducer = combineReducers({
    cart: cartReducer,
    wishlist: wishReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
