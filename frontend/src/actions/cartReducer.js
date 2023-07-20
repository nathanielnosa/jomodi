// cartReducer.js

const initialState = {
    cartItems: [],
    wishlistItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id);

            if (productIndex !== -1) {
                // If the product already exists, increase its quantity
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[productIndex].quantity += action.payload.quantity;
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // If the product doesn't exist, add it to the cart
                const newCartItem = { ...action.payload.product, quantity: action.payload.quantity };
                return {
                    ...state,
                    cartItems: [...state.cartItems, newCartItem],
                };
            }

        case 'REMOVE_FROM_CART':
            const updatedCartItems = [...state.cartItems];
            updatedCartItems.splice(action.payload, 1);
            return {
                ...state,
                cartItems: updatedCartItems,
            };

        case 'UPDATE_CART_ITEM_QUANTITY':
            const { index, quantity } = action.payload;
            if (quantity > 0) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[index].quantity = quantity;
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                return state;
            }

        default:
            return state;
    }
};

export default cartReducer;
