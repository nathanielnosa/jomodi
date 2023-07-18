import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Text, Button, Badge } from '@mantine/core';

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
      <div>
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <div className="product-widget" key={index} style={{ padding: "20px" }}>
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
              <Button
                variant="light"
                color="red"
                style={{ marginLeft: 'auto' }}
                onClick={() => handleRemoveFromCart(index)}
              >
                <i className="fa fa-trash"></i> {/* You can use any icon here */}
              </Button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <Text size="sm">
            <Badge color="teal" variant="filled">
              {cartQuantity}
            </Badge>{' '}
            Item(s) selected
          </Text>
          <h5>SUBTOTAL: ${cartTotal.toFixed(2)}</h5>
        </div>
        <div className="cart-btns" style={{ fontSize: "20px" }}>
          <Link to="/checkout">
            <Button color="blue" size="lg" fullWidth>
              Checkout <i className="fa fa-arrow-circle-right"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
