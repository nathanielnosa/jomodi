import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

// Retrieve cart items from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

// Initialize the initial state of the cart with cart items from local storage
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
};

const rootReducer = combineReducers({
    cart: cartReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
