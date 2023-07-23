// cartActions.js

export const addToCart = (product, quantity) => {
    return {
        type: 'ADD_TO_CART',
        payload: {
            product: product,
            quantity: quantity,
        },
    };
};

export const removeFromCart = (index) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: index,
    };
};


export const updateCartItemQuantity = (index, quantity, buy) => {
    return {
        type: 'UPDATE_CART_ITEM_QUANTITY',
        payload: { index, quantity , buy },
    };
};

export const removeCartItems = () => { 
    return {
        type: 'REMOVE_CART_ITEMS',
    };
}