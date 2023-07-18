import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoreTop from "../components/StoreTop";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import CatSidebar from "../components/CatSidebar";

function Store() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPriceSlider, setMaxPriceSlider] = useState(0);
  const [minPriceSlider, setMinPriceSlider] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}product/category_product_fetch/?category_id=${id}`)
      .then((res) => {
        setProducts(res.data.results);
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
  }, [id]);

  const filteredProducts = products.filter((product) => {
    const brandMatch = selectedBrands.some((id) => id === product?.brand?.id);
    const priceMatch =
      product.price >= minPriceSlider && product.price <= maxPriceSlider;

    if (
      selectedBrands.length === 0 &&
      ((maxPriceSlider == maxPrice && minPriceSlider == minPrice) ||
        (maxPriceSlider == 0 && minPriceSlider == 0))
    ) {
      return true;
    } else if (maxPriceSlider != maxPrice || minPriceSlider != minPrice) {
      return priceMatch;
    } else {
      return brandMatch && priceMatch;
    }
  });

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <CatSidebar
            max={maxPrice || maxPriceSlider}
            min={minPrice || minPriceSlider}
            selectedBrands={selectedBrands}
            onBrandChange={setSelectedBrands}
            updateMaxPrice={setMaxPriceSlider} // Pass the setMaxPrice function to update maxPrice
            updateMinPrice={setMinPriceSlider} // Pass the setMinPrice function to update minPrice
          />

          <div id="store" className="col-md-9">
            <StoreTop />
            <div className="row">
              {filteredProducts?.map((product, index) => {
                return <ProductCard product={product} key={index} />;
              })}
            </div>
            <div className="store-filter clearfix">
              <span className="store-qty">
                Showing {products?.length} products
              </span>
              {/* <ul className="store-pagination">
                <li className="active">1</li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
