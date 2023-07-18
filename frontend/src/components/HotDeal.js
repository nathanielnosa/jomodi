import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../constants'
import axios from 'axios'


function HotDeal() {
    const [banner, setBanner] = useState()

    useEffect(() => {
        axios.get(API_URL + 'product/home_banner_image/1/')
            .then(res => {
                console.log(res.data);
                setBanner(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

  return (
      <div id="hot-deal" className="section"
      style={{
            backgroundImage: `url(${banner?.image})`,
      }}
      >
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="hot-deal">
                          <ul className="hot-deal-countdown">
                              <li>
                                  <div>
                                      <h3>02</h3>
                                      <span>Days</span>
                                  </div>
                              </li>
                              <li>
                                  <div>
                                      <h3>10</h3>
                                      <span>Hours</span>
                                  </div>
                              </li>
                              <li>
                                  <div>
                                      <h3>34</h3>
                                      <span>Mins</span>
                                  </div>
                              </li>
                              <li>
                                  <div>
                                      <h3>60</h3>
                                      <span>Secs</span>
                                  </div>
                              </li>
                          </ul>
                          <h2 className="text-uppercase">hot deal this week</h2>
                          <p>New Collection Up to 50% OFF</p>
                          <a className="primary-btn cta-btn" href="#">Shop now</a>
                      </div>
                  </div>
              </div>

          </div>

      </div>
  )
}

export default HotDeal