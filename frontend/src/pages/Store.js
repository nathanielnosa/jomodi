import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StoreTop from '../components/StoreTop';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { API_URL } from '../constants';

function Store() {
  const [products, setProducts] = useState([]);
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
        // Set the products state
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
  }, []);

  // Update filtered products based on selected categories, brands, maxPrice, and minPrice
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((id) => id === product?.category?.id);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.some((id) => id === product?.brand?.id);
    const priceMatch = product.price >= minPriceSlider && product.price <= maxPriceSlider;

    if (maxPrice !== 0 && minPrice !== 0) { // Check if maxPrice and minPrice are not equal to 0
      if (
        (selectedCategories.length === 0 && selectedBrands.length === 0) ||
        (maxPriceSlider === maxPrice &&
        minPriceSlider === minPrice)
      ) {
        // If no categories, brands, and price filters are applied, display all products
        return true;
      } else if (selectedCategories.length === 0 && selectedBrands.length === 0 ) {
        // If no categories and brands are selected, apply only the price filter
        return priceMatch;
      } else {
        // Apply filters based on selected categories, brands, and price range
        return (categoryMatch && brandMatch) ;
      }
    } else {
      // If maxPrice or minPrice is 0, display all products without price filtering
      return categoryMatch && brandMatch;
    }
  });



console.log((selectedCategories.length === 0 && selectedBrands.length === 0) ||
  (maxPriceSlider == maxPrice && minPriceSlider == minPrice));


return (
  <div className="section">
    <div>
      <div className="row">
        {maxPrice !== 0 && minPrice !== 0 && ( // Render Sidebar only when maxPrice and minPrice are non-zero
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
        )}

        <div id="store" className="col-md-9">
          <StoreTop />

          <div className="row">
            {filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>

          <div className="store-filter clearfix">
            {maxPrice}
            <span className="store-qty">Showing {filteredProducts.length} products</span>
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
