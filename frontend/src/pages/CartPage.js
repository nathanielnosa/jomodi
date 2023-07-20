import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { updateCartItemQuantity } from '../actions/cartActions';

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItems = [...cartItems];
      updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
      dispatch(updateCartItemQuantity(index, newQuantity));
    }
  };



  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    notifications.show({
      title: 'Successfully Added your Wish List',
      message: 'Successfully Added your Wish List! 🤥',
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.green[6],
          borderColor: theme.colors.green[6],
          height: '100px',
          width: 'auto',
          '&::before': { backgroundColor: theme.white },
        },

        title: { color: theme.white, fontSize: '20px' },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          '&:hover': { backgroundColor: theme.colors.green[7] },
        },
      }),
    })
  };

  return (
    <div className="container mt-5">
      <div className="row" style={{
        backgroundColor: 'white',
      }}>
        <div className="col-md-8">
          <div className="card mb-3">
            {cartItems.map((item, index) => (
              <div key={index} className="row no-gutters" style={{
                margin: '20px',
                padding: '20px'
              }}>
                <div className="col-md-4">

                  <img src={item.image} className="card-img" alt="Product Image"
                    style={{
                      width: "90%",
                      height: "90%",
                    }}
                  />
                  <div className="qty-label" style={{ marginTop: '20px' }}>
                    <div className="input-number" style={{ width: '100px' }}>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                      />
                      <span className="qty-up" onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                        +
                      </span>
                      <span className="qty-down" onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                        -
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <Group position="right">
                    <p className="card-title"> Delivery in 7 days</p>
                  </Group>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/product/${item.id}`} style={
                        {
                          textDecoration: 'none',
                          color: 'black'
                        }
                      }>{item.name.toUpperCase()}</Link>
                    </h5>
                    <Group position="left">
                      <del className="product-old-price">₹{item?.cancel_price}</del>
                      <p className="card-title"> ₹{
                        item.price.toFixed(2)
                      }</p>
                    </Group>
                    <p className="card-title">Quantity: {item.quantity}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleAddToWishlist(item)}>
                      Save for Later</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(index)}
                      style={{
                        marginLeft: '20px'
                      }}
                    >
                      Remove</button>
                  </div>

                </div>
              </div>
            ))}
            <Group position="right">

              <Link to="/checkout" style={{
                textDecoration: 'none',
              }}>
                <button className="btn btn-warning btn-block btn-lg">
                  Proceed Checkout <i className="fa fa-arrow-circle-right"></i>

                </button> </Link>
            </Group>
          </div>


        </div>
        <div className="col-md-4" style={{
          marginTop: '50px',
          border: '1px solid black',
          padding: '20px'
        }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Price Details</h4>
              <Group position="apart">
                <h4 className='card-title'>You have {cartQuantity} items in your cart</h4>
              </Group>
              <Group position="apart">
                <h4 className="card-title">Subtotal:</h4>

                <h4> ₹{cartTotal.toFixed(0)}</h4>
              </Group>
              <Group position="apart">
                <h4 className="card-title">Shipping:</h4>
                <h4>Free</h4>
              </Group>
              <Group position="apart">
                <h4 className="card-title">Total Amount:</h4>

                <h4>₹{cartTotal.toFixed(2)}</h4>
              </Group>

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