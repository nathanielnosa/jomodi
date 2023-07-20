import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';

function NavCat() {
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
        <nav id="navigation" className="bg-gray-800 py-2">
            <div className="container px-4">
                <div id="responsive-nav">
                    <ul className="main-nav nav navbar-nav flex items-center justify-between">
                        <li className="active">
                            <Link to="/">Home</Link>
                        </li>
                        {categories?.map((category) => (
                            <li key={category.id}>
                                <Link to={`/category/${category.id}/${category.name}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavCat;
