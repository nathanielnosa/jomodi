
// cartReducer.js

const initialState = {
    wishlistItems: [], // Ensure that this is initialized as an empty array
};

const wishReducer = (state = initialState, action) => {
    switch (action.type) {
        // ... your existing cases ...

        case 'ADD_TO_WISHLIST':
            const productExistsInWishlist = state.wishlistItems.some((item) => item.id === action.payload.id);
            if (productExistsInWishlist) {
                // If the product already exists in the wishlist, don't add it again
                return state;
            } else {
                // If the product doesn't exist in the wishlist, add it to the wishlist
                const updatedWishlistItems = [...state.wishlistItems, action.payload];
                return {
                    ...state,
                    wishlistItems: updatedWishlistItems,
                };
            }

        case 'REMOVE_FROM_WISHLIST':
            const updatedWishlistItems = [...state.wishlistItems];
            updatedWishlistItems.splice(action.payload, 1);
            return {
                ...state,
                wishlistItems: updatedWishlistItems,
            };

        // case 'REMOVE_FROM_WISHLIST':
        //     const updatedWishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
        //     return {
        //         ...state,
        //         wishlistItems: updatedWishlistItems,
        //     };

        default:
            return state;
    }
};

export default wishReducer;
