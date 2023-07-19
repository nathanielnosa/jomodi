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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2>Your Shopping Cart</h2>
          <div className="card mb-3">
            {cartItems.map((item, index) => (
              <div key={index} className="row no-gutters" style={{
                margin: '20px',
                border: '1px solid #ccc',
                padding: '20px'
              }}>
                <div className="col-md-4">
                  <img src={item.image} className="card-img" alt="Product Image"
                    style={{
                      width: "90%",
                      height: "90%",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/product/${item.id}`} style={
                        {
                          textDecoration: 'none'
                        }
                      }>{item.name.toUpperCase()}</Link>
                    </h5>
                    <p className="card-title">Price: ₹{
                      item.price.toFixed(2)
                    }</p>
                    <p className="card-title">Quantity: {item.quantity}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(index)}>
                      <i className="fa fa-close"></i>Remove From Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
        <div className="col-md-4" style={{
          marginTop: '50px',
          border: '1px solid black',
          padding: '20px'
        }}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <p className='card-title'>You have {cartQuantity} items in your cart</p>
              <p className="card-title">Subtotal: ₹{cartTotal.toFixed(0)}</p>
              <p className="card-title">Shipping: ₹50.00</p>
              <p className="card-title">Total: ₹{cartTotal.toFixed(2)}</p>
              <Link to="/checkout">
                <button className="btn btn-primary btn-block">

                  Proceed Checkout <i className="fa fa-arrow-circle-right"></i>

                </button> </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;


{/* <div className="col-md-12 clearfix">
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

</div> */}