import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Menu } from '@mantine/core';

function NavCat() {
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL + 'category/category/')
            .then((res) => {
                console.log(res.data.results[0]?.id);
                setCategories(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(API_URL + 'category/subcategory-detail/')
            .then((res) => {
                console.log(res.data.results[0]?.id);
                setSubCategories(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    

    useEffect(() => {
        axios
            .get(API_URL + 'category/brand-detail/')
            .then((res) => {
                console.log(res.data.results[0]?.id);
                setBrand(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Function to handle hover on category
    const handleCategoryHover = (categoryId) => {
        setOpenDropdown(categoryId);
    };

    // Function to handle mouse leave on menu
    const handleMenuLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <nav id="navigation" className="bg-gray-800 py-2"
            onMouseLeave={handleMenuLeave}
        >
            <div className="container px-4"

            >
                <div id="responsive-nav">
                    <ul className="main-nav nav navbar-nav flex items-center justify-between">
                        <li style={{
                            color: 'black',
                            padding: '0 1rem',
                            borderBottom: '0px solid black',
                        }}>
                            <Link to="/">Home</Link>
                        </li>
                        {categories?.map((category) => (
                            <li
                                key={category?.id}
                                onMouseEnter={() => handleCategoryHover(category?.id)}
                                // onMouseLeave={handleMenuLeave}
                                style={{
                                    position: 'relative', // Add position relative to each category item
                                }}
                            >
                                <Link
                                    to={`/category/${category?.id}/${category?.name}`}
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    {category.name?.toUpperCase()}
                                </Link>

                                {openDropdown == category?.id && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '110%',
                                            width: '300px',
                                            left: "-150%",
                                            zIndex: 99, // Ensure the dropdown is above other content
                                            background: 'white',
                                            padding: '0 1rem',
                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                            minWidth: '200px',

                                        }}
                                    >
                                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                            {subcategories
                                                .filter((item) => item?.category?.id == category?.id)
                                                .map((item) => (
                                                    <li
                                                        key={item?.id}
                                                        style={{
                                                            fontWeight: '500',
                                                            fontSize: '1.4rem',
                                                            margin: 0,
                                                            padding: '1rem 0',
                                                            textAlign: 'center',

                                                        }}
                                                        className='brand-item'
                                                    >
                                                        <Link to={`/subcategory/${item?.id}/${item?.name}`}
                                                            style={{
                                                                textDecoration: 'none',
                                                                pointer: 'cursor',

                                                            }}
                                                        >
                                                            {item?.name?.toUpperCase()}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavCat;
