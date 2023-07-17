import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import StoreTop from '../components/StoreTop'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { API_URL } from '../constants'
import { useParams } from 'react-router-dom'

function SearchPage() {
    const { keyword } = useParams();
    const [products, setProducts] = useState([])
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);

    useEffect(() => {
        axios
            .get(`${API_URL}product/product_detail/`)
            .then((res) => {
                // Filter products based on keyword
                const filteredProducts = res.data.results.filter((product) =>
                    product.name.toLowerCase().includes(keyword.toLowerCase())
                );

                // Set the products state
                setProducts(filteredProducts);

                // Calculate the maximum and minimum prices
                const prices = res.data.results.map((product) => product.price);
                const maxPrice = Math.max(...prices);
                const minPrice = Math.min(...prices);

                // Set the maxPrice and minPrice states
                setMaxPrice(maxPrice);
                setMinPrice(minPrice);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [keyword]);

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <Sidebar max={maxPrice} min={minPrice} />

                    <div id="store" className="col-md-9">

                        <StoreTop />

                        <div className="row">
                            {
                                products.length > 0 ?
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
                            <ul className="store-pagination">
                                <li className="active">1</li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SearchPage