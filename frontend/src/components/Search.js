import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { Group, Select, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function Search() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState(0);
    const [productSuggestions, setProductSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}/${category}`);
        setIsFocused(false);
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}/${product.name}`);
        setIsFocused(false);
    };

    useEffect(() => {
        // Fetch product suggestions based on the user's input
        axios
            .get(`${API_URL}product/product_detail/`)
            .then((response) => {
                console.log(response.data.results);
                const filteredSuggestions = response.data.results.filter(
                    (product) => product.name.toLowerCase().includes(keyword.toLowerCase()));
                setProductSuggestions(filteredSuggestions);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [keyword]);
    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        // Add event listener to the document to handle clicks outside the div
        const handleOutsideClick = (e) => {
            if (isFocused && !e.target.closest('.header-search')) {
                setIsFocused(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            // Clean up the event listener when the component unmounts
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isFocused]);

    return (
        <div className="header-search">
            <form>
                <ul className="main-nav nav navbar-nav flex items-center justify-between">
                    <div style={{ position: 'relative', width: '500px', zIndex: 1 }}>
                        <TextInput
                            placeholder="Search brand or product"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            size="xl"
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    handleSearch(e);
                                }
                            }}
                        />
                        <IconSearch
                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                            onClick={handleSearch}
                        />
                        {isFocused && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '4px',
                                    marginTop: '4px',
                                    padding: '8px',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                }}
                            >

                                {productSuggestions.map((product, index) => (
                                    <Link
                                        to={`/product/${product.id}/${product.name}`}
                                        style={{ textDecoration: 'none' }}
                                        target="_blank"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsFocused(false);
                                        }}
                                    >
                                        <li
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '10px',
                                                cursor: 'pointer',
                                                zIndex: 99,
                                            }}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '24px', height: '24px', marginRight: '8px' }}
                                            />
                                            <span>{product.name}</span>
                                        </li>
                                    </Link>
                                ))}

                            </div>
                        )}
                    </div>
                </ul>
            </form>

        </div>
    );
}

export default Search;
