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


