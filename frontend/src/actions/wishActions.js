// Compare this snippet from src\actions\wishlistActions.js:

export const addToWishlist = (product) => {
    return {
        type: 'ADD_TO_WISHLIST',
        payload: product,
    };
}

export const removeFromWishlist = (index) => {
    return {
        type: 'REMOVE_FROM_WISHLIST',
        payload: index,
    };
}