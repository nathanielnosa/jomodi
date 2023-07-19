import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Group } from '@mantine/core';

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2>Your Wish List</h2>
          <div className="card mb-3">
            {wishlist.map((item, index) => (
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
                    <h4 className="card-title"

                    >
                      <Link to={`/product/${item.id}`} style={
                        {
                          textDecoration: 'none'
                        }
                      }>{item.name.toUpperCase()}</Link>
                    </h4>
                    <p className="card-title">Price: ₹{
                      item.price.toFixed(2)
                    }</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromWishlist(index)}>
                      <i className="fa fa-close"></i>Remove From List</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default WishListPage;


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