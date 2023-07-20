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
  const [sortingOption, setSortingOption] = useState('1');

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
    const brandMatch = selectedBrands.length === 0 || selectedBrands.some((id) => id === product?.brand?.id);

    // Check if minPriceSlider and maxPriceSlider are valid numbers
    const validPriceRange = !isNaN(minPriceSlider) && !isNaN(maxPriceSlider) && minPriceSlider <= maxPriceSlider;

    // Check if the product price is within the selected price range
    const priceMatch = validPriceRange && product.price >= minPriceSlider && product.price <= maxPriceSlider;

    if (validPriceRange) {
      // If valid price range is applied
      if (selectedBrands.length === 0) {
        // If no categories and brands are selected, apply only the price filter
        return priceMatch;
      } else {
        // Apply filters based on selected categories, brands, and price range
        return (brandMatch && priceMatch);
      }
    } else {
      // If invalid price range, apply filters based on selected categories and brands only
      return (brandMatch);
    }
  });

  const handleSortChange = (selectedValue) => {
    // Update the sorting option state
    setSortingOption(selectedValue);

    // Implement your sorting logic based on the selectedValue
    // For example, you can sort the filteredProducts array here
    let sortedProducts = [...filteredProducts];

    switch (selectedValue) {
      case '1':
        // Sort by recommended (You can define your sorting logic here)
        // For example, you can sort by product rating, popularity, etc.
        sortedProducts.sort(() => Math.random() - 0.5);
        break;
      case '2':
        // Sort by price: Low to High
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case '3':
        // Sort by price: High to Low
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case '4':
        // Sort by newest arrivals (You can sort based on product timestamp or ID)
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    // Update the filteredProducts state with the sorted array
    setProducts(sortedProducts);
  };

  return (
    <div className="section">
      <div>
        <div className="row">
          {maxPrice !== 0 && minPrice !== 0 && (
          <CatSidebar
            max={maxPrice || maxPriceSlider}
            min={minPrice || minPriceSlider}
            selectedBrands={selectedBrands}
            onBrandChange={setSelectedBrands}
            updateMaxPrice={setMaxPriceSlider} // Pass the setMaxPrice function to update maxPrice
            updateMinPrice={setMinPriceSlider} // Pass the setMinPrice function to update minPrice
          />
          )}
          <div id="store" className="col-md-9">
            <StoreTop onSortChange={handleSortChange} />
            <div className="row">
              {filteredProducts.length > 0 ? filteredProducts.map((product, index) => (
                <ProductCard product={product} key={index} />
              )) : products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
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
