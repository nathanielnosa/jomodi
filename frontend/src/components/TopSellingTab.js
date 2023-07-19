import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function TopSellingTab({ filterCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(API_URL + 'category/category/')
            .then(res => {
                console.log(res.data.results[0].id);
                setCategories(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div className="col-md-12">
            <div className="section-title">
                <h3 className="title">Top Selling Products</h3>
                <div className="section-nav">
                    <ul className="section-tab-nav tab-nav">
                        <li><a data-toggle="tab" href="#tab1" style={{
                            textDecoration: 'none',
                        }}
                            onClick={() => filterCategory(null)}
                        >
                            All
                        </a></li>
                        {
                            categories?.map((category) => (
                                <li><a data-toggle="tab" href="#tab1" style={{
                                    textDecoration: 'none',
                                }}
                                    onClick={() => filterCategory(category.id)}
                                >
                                    {
                                        category.name
                                    }
                                </a></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopSellingTab