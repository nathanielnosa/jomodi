import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Button, Divider, Group, Input, Title, Paper, Container, Center, Image, Select, Checkbox } from '@mantine/core';
import { UnstyledButton, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { updateCartItemQuantity } from '../actions/cartActions';
import dayjs from 'dayjs';
import RemoveFromCartModal from '../components/RemoveFromCartModal';

function CartPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [colorImage, setColorImage] = useState([]);
  useEffect(() => {
    // Update cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleOpen = (productId) => {
    setSelectedProduct(productId);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
    handleClose();
  };

  const cartQuantity = cartItems.filter((item) => item.buy).length;
  // const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  // const cartDiscount = cartItems.reduce((total, item) => total + item.quantity * item.cancel_price, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    if (item.buy) {
      return total + item.quantity * item.price;
    }
    return total;
  }, 0);

  const cartDiscount = cartItems.reduce((total, item) => {
    if (item.buy) {
      return total + item.quantity * item.cancel_price;
    }
    return total;
  }, 0);

  const handleQuantityChange = (index, newQuantity, max) => {
    if (newQuantity > 0) {
      const updatedItems = [...cartItems];
      updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
      dispatch(updateCartItemQuantity(index, newQuantity, updatedItems[index].buy)); // Also pass the "buy" option to the updateCartItemQuantity action
    }
  };

  const getDiscount = (price, cancel_price) => {
    const discount = ((cancel_price - price) / cancel_price) * 100;
    return discount.toFixed(0);
  };


  const handleBuyOptionChange = (index, buy) => {
    const updatedItems = [...cartItems];
    updatedItems[index] = { ...updatedItems[index], buy };
    dispatch(updateCartItemQuantity(index, updatedItems[index].quantity, buy)); // Also pass the updated "buy" option to the updateCartItemQuantity action
  };


  const getDeliveryDate = () => {
    const today = dayjs();
    const deliveryDate = today.add(7, 'day');

    // Format the delivery date as "DD/MM/YYYY"
    const formattedDeliveryDate = deliveryDate.format('DD-MMMM-YYYY');
    return formattedDeliveryDate;
  };


  console.log('cartItems', cartItems);

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
    <div className="mt-5">
      <div className="row">
        <RemoveFromCartModal
          handleRemove={() => handleRemoveFromCart(selectedProduct.id)}
          handleClose={() => handleClose()}
          showModal={showModal}
          selectedProduct={selectedProduct}
          text="Cart"
        />

        {
          cartItems.length > 0 ? (
            <>
              <div className="col-md-7" style={{
                backgroundColor: 'white',
              }}>
                <div className="card mb-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="row no-gutters" style={{
                      margin: '3px',
                      padding: '3px',
                    }}>
                      <div className="col-md-2">
                        <label>
                          <Checkbox
                            // type="checkbox"
                            size="lg"
                            radius="xl"
                            checked={item.buy}
                            onChange={(e) => handleBuyOptionChange(index, e.target.checked)}
                            color='red'
                          />

                        </label>
                        <img src={item.image} className="card-img" alt="Product Image"
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <Group position="left">
                          <h4 className="card-title">
                            <Link to={`/product/${item.id}/${item.name}`}
                              target='_blank'
                              style={
                                {
                                  textDecoration: 'none',
                                  color: 'black',

                                }
                              }>{item.name.toUpperCase()}</Link>
                          </h4>
                          {/* <p className="card-title"> Delivery by {getDeliveryDate()} | Free </p> */}
                        </Group>
                        <div className="card-body">
                         {/* <Group>
                            <p className="card-text" style={{
                              marginBottom: '10px',
                            }}>{item?.category?.name}</p>
                            <p className="card-text" style={{
                              marginBottom: '10px',
                            }}>{item?.subcategory?.name}</p>
                            <p className="card-text" style={{
                              marginBottom: '10px',
                            }}>{item?.brand?.name}</p>
                         </Group> */}
                         
                          <Group position="left">
                            <del className="product-old-price" style={{
                              marginBottom: '10px',
                            }}>₹{item?.cancel_price}</del>
                            <p className="card-title" style={{
                              marginBottom: '10px',
                            }}> ₹{
                                item.price.toFixed(2)
                              }</p>
                            {/* <p className="card-title" style={{
                              marginBottom: '10px',
                              color: 'green'
                            }}>You Save ₹{item.cancel_price - item.price}</p> */}

                            {/* <p className="card-title" style={{
                              marginBottom: '10px',
                              marginRight:'10px',
                              color: 'green'
                            }}>You Save ₹{item.cancel_price - item.price}</p> */}

                            {item.show_size && (
                              <>
                                <label style={{
                                  marginBottom: '10px',
                                }}>Size:</label>

                                <select className="form-control" style={{ width: '80px', marginHorizontal: '10px', height: "32px", }}>
                                  <option value="">
                                    {item.selected_size}
                                  </option>
                                  {item?.size?.filter((s) => s.size !== item.selected_size).
                                    map((size, index) => (
                                      <option key={index} value={size?.size?.trim().toUpperCase()}>
                                        {size?.size?.trim().toUpperCase()}
                                      </option>
                                    ))}
                                </select>
                              </>

                            )}
                            {item.show_color && (
                              <>
                                <label style={{
                                  marginBottom: '10px',
                                }}>Color:</label>

                                <select className="form-control" style={{ width: '80px', marginHorizontal: '10px', height: "32px", }}>
                                  <option value="">
                                    {item.selected_color}
                                  </option>
                                  {
                                    item?.color?.filter((c) => c.color !== item.selected_color).
                                      map((color, index) => (
                                        <option key={index} value={color.color}>
                                          {color.color}
                                        </option>
                                      ))

                                  }
                                </select>
                              </>

                            )}
                            
                          </Group>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <Group position="left">
                          <div className="qty-label">
                            <UnstyledButton>
                              <Group position='left'>
                                <Button radius="xl" size="md"
                                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                  variant="outline" color="red"
                                >
                                  - </Button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                                  style={{
                                    width: '40px',
                                    height: '24px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    margin: '0 5px',
                                  }}
                                />
                                <Button radius="xl" size="md" onClick={() =>{
                                  const max = item.available_quantity;
                                  handleQuantityChange(index, max>item.quantity?item.quantity + 1:item.quantity )
                                }} variant="outline" color="red">
                                  + </Button>
                              </Group>
                            </UnstyledButton>
                          </div>
                          <Group mx="xl">
                            <UnstyledButton onClick={() => {
                              handleAddToWishlist(item);

                            }}>
                              <Text weight={600} size="xl">
                                SAVE FOR LATER
                              </Text>
                            </UnstyledButton>
                            <UnstyledButton onClick={() => handleOpen(item)}>
                              <Text weight={600} size="xl">
                                REMOVE
                              </Text>
                            </UnstyledButton>
                          </Group>

                        </Group>
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
                padding: '20px',
                backgroundColor: 'white',
                marginLeft: '20px',
                position: "sticky",
                top: 0,
                background: "white",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                padding: "20px",
                marginTop: "20px",
              }}>
                <div className="card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        color: 'gray'
                      }}>Price Details</h4>
                      <hr />
                      <Group position="apart" style={{
                        marginTop: '20px'
                      }}>
                        <h4 className="card-title" style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}>Price ({cartQuantity}) items :</h4>

                        <h4 style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}> ₹{cartDiscount.toFixed(0)}</h4>
                      </Group>
                      <Group position="apart" style={{
                        marginTop: '20px'
                      }}>
                        <h4 className="card-title" style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}>Discount:</h4>
                        <h4 style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',
                          color: 'green'

                        }}>
                          - {" "} ₹{cartDiscount.toFixed(0) - cartTotal.toFixed(0)}
                        </h4>
                      </Group>
                      <Group position="apart" style={{
                        marginTop: '20px'
                      }}>
                        <h4 className="card-title" style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}>Delivery Charges:</h4>

                        <h4 style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}>Free</h4>
                      </Group>
                      <hr />
                      <Group position="apart" style={{
                        marginTop: '20px'
                      }}>
                        <h4 className="card-title" style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}>Total Amount:</h4>

                        <h4 style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',

                        }}>₹{cartTotal.toFixed(2)}</h4>
                      </Group>
                      <hr />
                      <Group position="left">
                        <h4 className="card-title" style={{
                          marginBottom: '20px',
                          fontWeight: 'bold',
                          fontSize: '15px',
                          color: 'green',
                          marginTop: '10px'
                        }}>You will save ₹{cartDiscount.toFixed(2) - cartTotal} on this Order</h4>
                      </Group>

                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Container size="sm" mt="xl">
              <Paper padding="xl" shadow="sm" m="lg">
                <Title align="center" order={2}>
                  Your Cart is Empty
                </Title>
                <Text align="center" size="xl" style={{ marginTop: '1rem' }}>
                  Explore our wide selection and find something you like.
                </Text>
                <Center mt="xl">
                  <Button variant="outline" color="teal" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                    onClick={() => navigate('/wishlist')}
                  >
                    Add Items from Wishlist
                  </Button>
                </Center>
                <Center mt="xl">
                  <Button variant="outline" color="teal" size="lg" radius="xl" mb="md" style={{ marginRight: '1rem' }}
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </Button>
                </Center>
              </Paper>
              <Image src="https://www.shopperswarehouse.com/assets/e_website/assets/site_image/empty_cart.png" alt="empty cart" />
            </Container>

          )
        }
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