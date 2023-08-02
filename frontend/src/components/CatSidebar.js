import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { useParams } from 'react-router-dom';
import { Accordion } from '@mantine/core';
import { Gender_list } from '../constants';
function CatSidebar({ max, min, selectedBrands, onBrandChange, updateMaxPrice, updateMinPrice, products, selectedGenders, setSelectedGenders }) {
    const { id } = useParams();
    const [brands, setBrands] = useState([]);
    // const [products, setProducts] = useState([]);
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

    const addMaxPrice = () => {
        setMaxPrice(maxPrice + 1000);
        updateMaxPrice(maxPrice + 1000);
    };

    const addMinPrice = () => {
        setMinPrice(minPrice + 1000);
        updateMinPrice(minPrice + 1000);
    }

    const subtractMaxPrice = () => {
        setMaxPrice(maxPrice - 1000);
        updateMaxPrice(maxPrice - 1000);
    };

    const subtractMinPrice = () => {
        setMinPrice(minPrice - 1000);
        updateMinPrice(minPrice - 1000);
    };

    useEffect(() => {
        axios.get(API_URL + 'category/brand-detail/')
            .then(res => {
                console.log(res.data.results);
                const brands = res.data.results.filter(brand => brand?.category?.id == parseInt(id));
                setBrands(brands);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    // Function to get the first 8 categories
    const getFirstEightBrands = () => {
        return brands.slice(0, 8);
    };

    // Function to get the remaining categories (excluding the first 8)
    const getRemainingBrands = () => {
        return brands.slice(8);
    };

    // State to keep track of whether to show all categories or just the first 8
    const [showAllBrands, setShowAllBrands] = useState(true);

    // Function to toggle showing all categories or just the first 8
    const handleToggleBrands = () => {
        setShowAllBrands(!showAllBrands);
    };



    const handleGenderChange = (selectedGender) => {
        if (selectedGenders.includes(selectedGender)) {
            setSelectedGenders(selectedGenders.filter(gender => gender !== selectedGender));
        } else {
            setSelectedGenders([...selectedGenders, selectedGender]);
        }
    };
    return (
        <div id="aside" className="col-md-3">


            <div className="aside">
                <Accordion radius="xl" defaultValue="customization">
                    <Accordion.Item value="customization">
                        <Accordion.Control style={{
                            fontSize: "15px"
                        }}>
                            Price
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className="price-filter">
                                <div id="price-slider">
                                    <Slider
                                        value={[minPrice, maxPrice]}
                                        onChange={(event, value) => {
                                            setMinPrice(value[0]);
                                            setMaxPrice(value[1]);
                                            updateMinPrice(value[0]);
                                            updateMaxPrice(value[1]);
                                        }}
                                        min={min}
                                        max={max}
                                        step={1}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `$${value}`} // Optional: To display the value as currency
                                        orientation="horizontal"
                                    />
                                </div>
                                <div className="input-number price-min">
                                    <input
                                        id="price-min"
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => { setMinPrice(e.target.value); updateMinPrice(e.target.value) }}
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
                                        onChange={(e) => { setMaxPrice(e.target.value); updateMaxPrice(e.target.value) }}
                                    />
                                    <span className="qty-up" onClick={addMaxPrice}>
                                        +
                                    </span>
                                    <span className="qty-down" onClick={subtractMaxPrice}>
                                        -
                                    </span>
                                </div>
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Accordion radius="xl" defaultValue="customization">
                    <Accordion.Item value="customization">
                        <Accordion.Control style={{
                            fontSize: "15px"
                        }}>
                            Gender
                        </Accordion.Control>
                        <Accordion.Panel>
                            {Gender_list?.map((gender, index) => (
                                <div className="input-checkbox" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`brand-${index}`}
                                        checked={selectedGenders?.includes(gender)}
                                        onChange={() => handleGenderChange(gender)}
                                    />
                                    <label htmlFor={`brand-${index}`}>
                                        <span></span>
                                        {gender}
                                    </label>
                                </div>
                            )
                            )}
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Accordion radius="xl" defaultValue="customization">
                    <Accordion.Item value="customization">
                        <Accordion.Control style={{
                            fontSize: "15px"
                        }}>
                            Brand
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className="checkbox-filter">
                                {
                                    !showAllBrands ? (
                                        <>
                                            {brands?.map((brand, index) => (
                                                <div className="input-checkbox" key={brand?.id}>
                                                    <input
                                                        type="checkbox"
                                                        id={`brand-${brand?.id}`}
                                                        checked={selectedBrands.includes(brand?.id)}
                                                        onChange={() => handleBrandChange(brand?.id)}
                                                    />
                                                    <label htmlFor={`brand-${brand?.id}`}>
                                                        <span></span>
                                                        {brand?.name}
                                                        <small>({
                                                            products?.filter((product) => product?.brand?.id == brand?.id).length
                                                        })</small>
                                                    </label>
                                                </div>
                                            ))}
                                            <button onClick={handleToggleBrands}>Show Less</button>
                                        </>
                                    ) : (
                                        <>
                                            {getFirstEightBrands()?.map((brand, index) => (

                                                <div className="input-checkbox" key={brand?.id}>
                                                    <input
                                                        type="checkbox"
                                                        id={`brand-${brand?.id}`}
                                                        checked={selectedBrands.includes(brand?.id)}
                                                        onChange={() => handleBrandChange(brand?.id)}
                                                    />
                                                    <label htmlFor={`brand-${brand?.id}`}>
                                                        <span></span>
                                                        {brand?.name}
                                                        <small>({
                                                            products?.filter((product) => product?.brand?.id == brand?.id).length
                                                        })</small>
                                                    </label>
                                                </div>
                                            )
                                            )}
                                            {brands.length > 8 && (
                                                <button onClick={handleToggleBrands}>
                                                    {`Show ${getRemainingBrands().length} more`}
                                                </button>
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>

    )
}

export default CatSidebar