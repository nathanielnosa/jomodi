import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Group, UnstyledButton, Divider, Text, Box,Paper, Container, Title, Center, Image } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import ProductCard from '../components/ProductCard';
import WishListCard from '../components/WishListCard';
import RemoveFromCartModal from '../components/RemoveFromCartModal';

function WishListPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update wishlist in local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleOpen = (productId) => {
    setSelectedProduct(productId);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleRemoveFromWishlist = (index) => {
    dispatch(removeFromWishlist(index));
    handleClose();
  };
  const wishlistQuantity = wishlist?.length;
  return (
    <div className="section">
      <div>
        <div className="row">
          <RemoveFromCartModal
            handleRemove={() => handleRemoveFromWishlist(selectedProduct)}
            handleClose={() => handleClose()}
            showModal={showModal}
            selectedProduct={selectedProduct}
            text="Wishlist"
          />
          <div id="store" className="col-md-12">
            {
              wishlistQuantity > 0 ? (
                <>
                  <Text size={30} fz={30} m={30} weight={700}>Wishlist {wishlist?.length} Items</Text>
                  <div className="row">
                    {
                      wishlist?.map((filteredProducts, index) => (
                        <>
                          <WishListCard product={filteredProducts} handleFunction={
                            () => handleOpen(filteredProducts.id)
                          } key={index} />
                        </>
                      )
                      )
                    }
                  </div>
                </>

              )
                : (
                  <Container size="sm" mt="xl">
                  <Paper padding="xl" shadow="sm" m="lg">
                      <Title align="center" order={2}>
                       Your Wishlist is Empty
                      </Title>
                      <Text align="center" size="xl" style={{ marginTop: '1rem' }}>
                        You have no items in your wishlist. Start adding some!
                        Review them anytime and easily move them to the bag
                      </Text>
                      <Center mt="xl">
                      <Button variant="outline" color="teal" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                        onClick={() => navigate('/')}
                      >
                        Continue Shopping
                      </Button>
                      </Center>
                  </Paper>
                    <Image src="https://www.shopperswarehouse.com/assets/e_website/assets/site_image/empty_wishlist.png" alt="empty wishlist" />
                  </Container>
                  
                )
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default WishListPage;
