import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import { useLocation } from 'react-router-dom';


function ProductCheckOut() {
  const { id } = useParams();
  const [productData, setProductData] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}product/product_detail/${id}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  console.log("productData:", productData); 

  return (
    <>

      <div id="breadcrumb" className="section">

        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <h3 className="breadcrumb-header">Checkout</h3>
              <ul className="breadcrumb-tree">
                <li><a href="#">Home</a></li>
                <li className="active">Checkout</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

      <div className="section">

        <div className="container">

          <div className="row">

            <div className="col-md-7">

              <div className="billing-details">
                <div className="section-title">
                  <h3 className="title">Billing address</h3>
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="first-name" placeholder="First Name" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="last-name" placeholder="Last Name" />
                </div>
                <div className="form-group">
                  <input className="input" type="email" name="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="address" placeholder="Address" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="city" placeholder="City" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="country" placeholder="Country" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="zip-code" placeholder="ZIP Code" />
                </div>
                <div className="form-group">
                  <input className="input" type="tel" name="tel" placeholder="Telephone" />
                </div>
              </div>

              <div className="shiping-details">
                <div className="section-title">
                  <h3 className="title">Shiping address</h3>
                </div>
                <div className="input-checkbox">
                  <input type="checkbox" id="shiping-address" />
                  <label htmlFor="shiping-address">
                    <span></span>
                    Ship to a diffrent address?
                  </label>
                  <div className="caption">
                    <div className="form-group">
                      <input className="input" type="text" name="first-name" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="text" name="last-name" placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="text" name="address" placeholder="Address" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="text" name="city" placeholder="City" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="text" name="country" placeholder="Country" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="text" name="zip-code" placeholder="ZIP Code" />
                    </div>
                    <div className="form-group">
                      <input className="input" type="tel" name="tel" placeholder="Telephone" />
                    </div>
                  </div>
                </div>
              </div>


            </div>


            <div className="col-md-5 order-details"
              style={{
                position: "sticky",
                top: 0,
                background: "white",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <div className="section-title text-center">
                <h3 className="title">Your Order</h3>
              </div>
              <div className="order-summary">
                <div className="order-col">
                  <div><strong>PRODUCT</strong></div>
                  <div><strong>TOTAL</strong></div>
                </div>
                <div className="order-products">

                  <div className="order-col">
                    <div>{productData?.name}</div>
                    <div>
                      ₹{(productData?.price)?.toFixed(2)}</div>
                  </div>

                </div>
                <div className="order-col">
                  <div>Shipping</div>
                  <div><strong>FREE</strong></div>
                </div>
                <div className="order-col">
                  <div><strong>TOTAL</strong></div>
                  <div><strong className="order-total">
                    ₹{productData?.price.toFixed(2)}</strong></div>
                </div>
              </div>
              <div className="payment-method">

                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-3" />
                  <label htmlFor="payment-3">
                    <span></span>
                    Payment on Delivery
                  </label>
                  <div className="caption">
                    <p>
                      Pay with cash upon delivery.
                    </p>
                  </div>
                </div>
              </div>
              <div className="input-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  <span></span>
                  I've read and accept the <a href="#">terms & conditions</a>
                </label>
              </div>
              <a href="#" className="primary-btn order-submit">Place order</a>
            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default ProductCheckOut