import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import StoreTop from '../components/StoreTop'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { API_URL } from '../constants'
import { useParams } from 'react-router-dom'

function SearchPage() {
    const { keyword, categoryid } = useParams();
    const [products, setProducts] = useState([])
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPriceSlider, setMaxPriceSlider] = useState(maxPrice);
    const [minPriceSlider, setMinPriceSlider] = useState(minPrice);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);


    useEffect(() => {
        axios
            .get(`${API_URL}product/product_detail/`)
            .then((res) => {
                // Filter products based on keyword
                console.log(res.data.results);
                const filteredProducts = categoryid == 0 ? 
                res.data.results.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase())) 
                : res.data.results.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()) 
                && product.category.id == categoryid);

                // Set the products state
                setProducts(filteredProducts);

                // Calculate the maximum and minimum prices
                const prices = filteredProducts.map((product) => product.price);
                const maxPrice = Math.max(...prices);
                const minPrice = Math.min(...prices);

                // Set the maxPrice and minPrice states
                setMaxPrice(maxPrice);
                setMinPrice(minPrice);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [keyword, categoryid]);

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategories.some((id) => id === product?.category?.id);
        const brandMatch = selectedBrands.some((id) => id === product?.brand?.id);
        const priceMatch = product.price >= minPriceSlider && product.price <= maxPriceSlider;

        if ((selectedCategories.length === 0 && selectedBrands.length === 0) &&
            ((maxPriceSlider == maxPrice && minPriceSlider == minPrice) || (maxPriceSlider == 0 && minPriceSlider == 0))) {
            return true;
        }
        else if (maxPriceSlider != maxPrice || minPriceSlider != minPrice) {
            return priceMatch;
        }
        else {
            return (categoryMatch || brandMatch) && priceMatch;
        }
    });
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <Sidebar
                        max={maxPrice}
                        min={minPrice}
                        selectedCategories={selectedCategories}
                        selectedBrands={selectedBrands}
                        onCategoryChange={setSelectedCategories}
                        onBrandChange={setSelectedBrands}
                        updateMaxPrice={setMaxPriceSlider} // Pass the setMaxPriceSlider function to update maxPriceSlider
                        updateMinPrice={setMinPriceSlider} // Pass the setMinPriceSlider function to update minPriceSlider
                    />

                    <div id="store" className="col-md-9">

                        <StoreTop />

                        <div className="row">
                            {
                                filteredProducts.length > 0 ?
                               ( products?.map((product, index) => {
                                    return (
                                        <ProductCard product={product} key={index} />
                                    )
                                })) : (
                                    <h3>No products found</h3>
                                )
                            }

                        </div>
                        <div className="store-filter clearfix">
                            <span className="store-qty">Showing {products?.length} products</span>
                            {/* <ul className="store-pagination">
                                <li className="active">1</li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                            </ul> */}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SearchPage