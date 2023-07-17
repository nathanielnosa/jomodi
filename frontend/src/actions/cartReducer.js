// cartReducer.js

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (productIndex !== -1) {
                // If the product already exists, increase its quantity
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[productIndex].quantity += 1;
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // If the product doesn't exist, add it to the cart
                const updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }

        case 'REMOVE_FROM_CART':
            const updatedCartItems = [...state.cartItems];
            updatedCartItems.splice(action.payload, 1);
            return {
                ...state,
                cartItems: updatedCartItems,
            };

        default:
            return state;
    }
};

export default cartReducer;
