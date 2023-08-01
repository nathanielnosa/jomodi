// cartActions.js

export const addToCart = (product, quantity, buy, size, gender, color) => {
    return {
        type: 'ADD_TO_CART',
        payload: {
            product: product,
            quantity: quantity,
            size: size,
            gender: gender,
            color: color,
            
        },
    };
};

export const removeFromCart = (index) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: index,
    };
};


export const updateCartItemQuantity = (index, quantity, buy, size, gender, color) => {
    return {
        type: 'UPDATE_CART_ITEM_QUANTITY',
        payload: { index, quantity , buy, gender, size, color},
    };
};

export const removeCartItems = () => { 
    return {
        type: 'REMOVE_CART_ITEMS',
    };
}