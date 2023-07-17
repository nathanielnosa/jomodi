import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { useParams } from 'react-router-dom';

function CatSidebar({ max, min, selectedBrands, onBrandChange }) {
    const { id } = useParams();
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(max);
    const [minPrice, setMinPrice] = useState(min);


    const handleBrandChange = (brandId) => {
        const isSelected = selectedBrands.includes(brandId);

        if (isSelected) {
            onBrandChange(selectedBrands.filter((id) => id !== brandId));
        } else {
            onBrandChange([...selectedBrands, brandId]);
        }
    };

    useEffect(() => {
        axios.get(`${API_URL}product/product_detail/`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addMaxPrice = () => {
        setMaxPrice(maxPrice + 1000);
    };

    const addMinPrice = () => {
        setMinPrice(minPrice + 1000);
    }

    const subtractMaxPrice = () => {
        setMaxPrice(maxPrice - 1000);
    };

    const subtractMinPrice = () => {
        setMinPrice(minPrice - 1000);
    };

    useEffect(() => {
        axios.get(API_URL + 'category/brand/')
            .then(res => {
                console.log(res.data.results[0].id);
                const brands = res.data.results.filter(brand => brand.category === parseInt(id));
                setBrands(brands);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);
    return (
        <div id="aside" className="col-md-3">


            <div className="aside">
                <h3 className="aside-title">Price</h3>
                <div className="price-filter">
                    <div id="price-slider">
                        <Slider
                            value={[minPrice, maxPrice]}
                            onChange={(event, value) => {
                                setMinPrice(value[0]);
                                setMaxPrice(value[1]);
                            }}
                            min={min}
                            max={max}
                            step={1}
                            orientation="horizontal"
                            sx={{ width: "100%", color: "#ff0000" }}
                        />
                    </div>
                    <div className="input-number price-min">
                        <input
                            id="price-min"
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span className="qty-up" onClick={addMinPrice}>
                            +
                        </span>
                        <span className="qty-down" onClick={subtractMinPrice}>
                            -
                        </span>
                    </div>
                    <span>-</span>
                    <div className="input-number price-max">
                        <input
                            id="price-max"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <span className="qty-up" onClick={addMaxPrice}>
                            +
                        </span>
                        <span className="qty-down" onClick={subtractMaxPrice}>
                            -
                        </span>
                    </div>
                </div>


            </div>

            <div className="aside">
                <h3 className="aside-title">Brand</h3>
                <div className="checkbox-filter">
                    {
                        brands?.map((brand, index) => (
                            <div className="input-checkbox">
                                <input type="checkbox" 
                                    id={`brand-${brand.id}`}
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={() => handleBrandChange(brand.id)}
                                />
                                <label htmlFor={`brand-${brand.id}`}>
                                    <span></span>
                                    {brand.name}
                                    <small>(578)</small>
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="aside">
                <h3 className="aside-title">Top selling</h3>
                {
                    products?.map((product, index) => (
                        <div key={index} className="product-widget">
                            <div className="product-img">
                                <img src={product?.image} alt="" />
                            </div>
                            <div className="product-body">
                                <p className="product-category">
                                    {
                                        product?.category?.name
                                    }
                                </p>
                                <h3 className="product-name">
                                    <Link to={`/product/${product?.id}`}>
                                        {
                                            product?.name
                                        }
                                    </Link></h3>
                                <h4 className="product-price">${product?.price} <del className="product-old-price">${product?.cancel_price}</del></h4>
                            </div>
                        </div>
                    ))
                }


            </div>

        </div>

    )
}

export default CatSidebar