import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Group, UnstyledButton, Divider } from '@mantine/core';

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
    <div className="mt-5">
      <div className="row" style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div className="col-md-8" style={{
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          margin: '15px',

        }}>
          <div className="card mb-3">
            {wishlist.map((item, index) => (
              <div key={index} className="row no-gutters" style={{
                margin: '5px',
                padding: '3px',
                marginTop: '10px',
              }}>
                <div className="col-md-2">

                  <img src={item.image} className="card-img" alt="Product Image"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" style={{
                      marginBottom: '10px',
                    }}>
                      <Link to={`/product/${item.id}/${item.name}}`}
                        target='_blank'
                        style={
                          {
                            textDecoration: 'none',
                            color: 'black',

                          }
                        }>{item.name.toUpperCase()}</Link>
                    </h5>
                    <Group position="left" >
                      <del className="product-old-price" style={{
                        marginBottom: '10px',
                      }}>₹{item?.cancel_price}</del>
                      <p className="card-title" style={{
                        marginBottom: '10px',
                      }}> ₹{
                          item.price.toFixed(2)
                        }</p>
                    </Group>
                    <button className="btn btn-danger btn-lg"
                      onClick={() => handleRemoveFromWishlist(index)}
                    >
                      <i className="fa fa-trash"></i>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-12">

                  <Divider style={{
                    marginTop: '10px'
                  }} />
                </div>

              </div>

            ))}
            <Group position="right" style={{
              position: "sticky",
              bottom: 0,
              background: "white",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              padding: "20px",
              marginTop: "20px",
            }}>

              <Link to="/wishlistcheckout" style={{
                textDecoration: 'none',
              }}>
                <button className="btn btn-danger btn-block btn-lg">
                  Buy Now <i className="fa fa-arrow-circle-right"></i>
                </button> </Link>
            </Group>
          </div>
        </div>
      </div>
    </div >
  );
}

export default WishListPage;
