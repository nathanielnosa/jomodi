import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Group } from '@mantine/core';

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };


  const cartQuantity = cartItems.length;
  const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="col-md-12 clearfix">
      <div style={{
        alignContent: "center",
        alignItems: "center",
        margin: "200"
        
      }}>
        <div className="cart-list" style={{
          padding: "20px"
        }}>
          {cartItems.map((item, index) => (
            <div className="product-widget" key={index} style={{
              padding: "20px"
            }}>
              <div className="product-img">
                <img src={item.image} alt="" />
              </div>
              <div className="product-body">
                <h3 className="product-name">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <h4 className="product-price">
                  <span className="qty">{item.quantity}x</span>${item.price.toFixed(2)}
                </h4>
              </div>
              <button className="delete" onClick={() => handleRemoveFromCart(index)}>
                <i className="fa fa-close"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <small>{cartQuantity} Item(s) selected</small>
          <h5>SUBTOTAL: ${cartTotal.toFixed(2)}</h5>
        </div>
        <Group>
          <Button>
            <Link to="/checkout">
              Checkout <i className="fa fa-arrow-circle-right"></i>
            </Link>
          </Button>
         
        </Group>
      </div>

    </div>
  );
}

export default CartPage;
