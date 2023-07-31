import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { Group, Select, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function Search() {
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState(0);
    const [productSuggestions, setProductSuggestions] = useState([]);


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

    const productList = productSuggestions.map((product) => (
        {
            label: product.name,
            value: product.id,
            image: product.image,
            category: product.category.name,
        }
    ))

    return (
        <div className="header-search">
            <form>
                <Group position="center">
                    <Link to={`/search/${keyword}/${category}`} 
                    style={{
                        textDecoration: 'none',
                    }}
                    >
                        <Select
                            placeholder="Search brand or product"
                            searchable
                            onSearchChange={setKeyword}
                            searchValue={keyword}
                            nothingFound="No options"
                            rightSection={<IconSearch size={20} />}
                            data={
                                productList
                            }
                            style={{
                                width: '300px',
                                marginTop: '10px',
                            }}
                            size='xl'
                        />

                    </Link>
                            <Text>
                                {keyword}
                            </Text>
            
                </Group>
            </form>
        </div>
    );
}

export default Search;
