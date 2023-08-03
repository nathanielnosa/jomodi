import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Group, UnstyledButton, Divider, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import ProductCard from '../components/ProductCard';
import WishListCard from '../components/WishListCard';


function WishListPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update wishlist in local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleRemoveFromWishlist = (index) => {
    dispatch(removeFromWishlist(index));
  };
  const wishlistQuantity = wishlist?.length;
  return (
    <div className="section">
      <div>
        <div className="row">
         
          <div id="store" className="col-md-12">
            <Text size={30} fz={30} m={30} weight={700}>Wishlist {wishlist?.length} Items</Text>
            <div className="row">
              {
                wishlist?.map((filteredProducts, index) => (
                  <>
                    <WishListCard product={filteredProducts} handleFunction={
                      () => handleRemoveFromWishlist(filteredProducts.id)
                    } key={index} />
                  </>
                )
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishListPage;
