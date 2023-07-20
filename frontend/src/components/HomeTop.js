import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../constants' 
import axios from 'axios'


function HomeTop() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(API_URL + 'category/category/')
            .then(res => {
                console.log(res.data.results[0].id);
                const shuffledCategories = res.data.results.sort(() => 0.5 - Math.random());

                // Select the first 3 products from the shuffled array for each group
                const selectedCategories = shuffledCategories.slice(0, 3);
                setCategories(selectedCategories);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <div className="section">
            <div>
                <div className="row">
                    <div className="col-md-3 col-xs-12">
                        <Link to='/store' className="cta-btn">
                            <div className="shop" style={{
                                backgroundImage: `url(/img/shop01.png)`,
                                backgroundSize: 'cover', // Make sure the background image covers the container
                                backgroundPosition: 'center', // Center the background image
                                transition: 'background-size 0.3s', // Add a smooth transition effect
                                width: '300px', // Set the width of the container
                                height: '200px', // Set the height of the container
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundSize = '130%'; // Zoom out the background image on hover
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundSize = 'cover'; // Reset the background size on mouse leave
                                }}>
                           
                                <div className="shop-body">
                                    <h3>All<br />Collection</h3>
                                    <a href="#" className="cta-btn" style={{
                                        color: 'white',
                                        textDecoration: 'none'
                                    }} >Shop now <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {
                        categories?.map((category, index) => (
                            <div className="col-md-3 col-xs-12">
                                <Link to={`/category/${category.id}/${category.name}`} className="cta-btn">
                                    <div className="shop"
                                        style={{
                                            backgroundImage: `url(${category.image})`,
                                            backgroundSize: 'cover', // Make sure the background image covers the container
                                            backgroundPosition: 'center', // Center the background image
                                            transition: 'background-size 0.3s', // Add a smooth transition effect
                                            width: '300px', // Set the width of the container
                                            height: '200px', // Set the height of the container
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundSize = '130%'; // Zoom out the background image on hover
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundSize = 'cover'; // Reset the background size on mouse leave
                                        }}
                                    >
                                        <div className="shop-img">
                                            <img src="http://web-production-d35c.up.railway.app/media/images/shop03.png" alt="" />
                                        </div>
                                        <div className="shop-body">
                                            <h3>
                                                {
                                                    category.name
                                                }
                                                <br />Collection</h3>
                                            <a href="#" style={{
                                                color: 'white',
                                                textDecoration: 'none'
                                            }} className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default HomeTop