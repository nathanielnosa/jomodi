import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoreTop from "../components/StoreTop";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import CatSidebar from "../components/CatSidebar";
import { Pagination, Group } from '@mantine/core';

function Store() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPriceSlider, setMaxPriceSlider] = useState(0);
  const [minPriceSlider, setMinPriceSlider] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortingOption, setSortingOption] = useState('1');
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

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
    console.log("minPriceSlider:", minPriceSlider);
    console.log("maxPriceSlider:", maxPriceSlider);
    console.log("Product price:", product.price);

    const brandMatch = selectedBrands.length === 0 || selectedBrands.some((id) => id === product?.brand?.id);

    // Check if minPriceSlider and maxPriceSlider are valid numbers and minPriceSlider is less than or equal to maxPriceSlider
    const validPriceRange = !isNaN(minPriceSlider) && !isNaN(maxPriceSlider) && (minPriceSlider <= maxPriceSlider) && maxPriceSlider !== 0 && minPriceSlider !== 0;

    // Check if the product price is within the selected price range
    const priceMatch = product.price >= minPriceSlider && product.price <= maxPriceSlider;

    if (validPriceRange) {
      // If valid price range is applied
      if ( selectedBrands.length === 0 && minPriceSlider != minPrice && maxPriceSlider != maxPrice) {
        // If no categories and brands are selected, apply only the price filter
        console.log("here 1")
        return priceMatch;
      } else {
        // Apply filters based on selected categories, brands, and price range
        console.log("here 2")
        return ( priceMatch) && (brandMatch && priceMatch);;
      }
    } else {
      // If invalid price range, apply filters based on selected categories and brands only
      if (selectedBrands.length === 0) {
        // If no categories and brands are selected and price range is invalid, do not apply any filter
        console.log("here 3")
        return true;
      } else {
        // Apply filters based on selected categories and brands only
        console.log("here 4")
        return  brandMatch;
      }
    }
  });

  const totalPages = filteredProducts.length == 0 ? Math.ceil(products?.length / itemsPerPage)
    : Math.ceil(filteredProducts?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const paginatedItems = filteredProducts.length == 0 ? (products?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage)) : (
    filteredProducts?.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage)
  );

  const handleSortChange = (selectedValue) => {
    // Update the sorting option state
    setSortingOption(selectedValue);

    // Implement your sorting logic based on the selectedValue
    // For example, you can sort the filteredProducts array here
    let sortedProducts = filteredProducts.length == 0 ? [...products] : [...filteredProducts];

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
          {maxPrice !== 0 && minPrice !== 0 && ( // Render Sidebar only when maxPrice and minPrice are non-zero
            <CatSidebar
              max={maxPrice}
              min={minPrice}
              selectedBrands={selectedBrands}
              products={products}
              onBrandChange={setSelectedBrands}
              updateMaxPrice={setMaxPriceSlider} // Pass the setMaxPriceSlider function to update maxPriceSlider
              updateMinPrice={setMinPriceSlider} // Pass the setMinPriceSlider function to update minPriceSlider
            />
          )}

          <div id="store" className="col-md-9">
            <StoreTop onSortChange={handleSortChange} />

            <div className="row">
              {
                filteredProducts.length == 0 ? (
                  paginatedItems.map((products, index) => (

                    <ProductCard product={products} key={index} />

                  ))) : (
                  paginatedItems.map((filteredProducts, index) => (
                    <ProductCard product={filteredProducts} key={index} />
                  )
                  ))
              }
            </div>
            <div className="store-filter clearfix">
              <span className="store-qty">Showing {filteredProducts.length || products.length} products</span>
              <Group spacing={5} position="right">
                <Pagination my="lg" total={totalPages}
                  value={page}
                  onChange={handlePageChange} color="red"
                  style={{
                    display: 'flex',
                    fontSize: '1.6rem',
                  }}
                />
              </Group>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
