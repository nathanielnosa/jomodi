import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';

function Sidebar({ max, min, selectedCategories, selectedBrands, onCategoryChange, onBrandChange, updateMaxPrice, updateMinPrice }) {
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [products, setProducts] = useState([]);
	const [maxPrice, setMaxPrice] = useState(max);
	const [minPrice, setMinPrice] = useState(min);

	const handleCategoryChange = (categoryId) => {
		const isSelected = selectedCategories.includes(categoryId);

		if (isSelected) {
			onCategoryChange(selectedCategories.filter((id) => id !== categoryId));
		} else {
			onCategoryChange([...selectedCategories, categoryId]);
		}
	};

	const handleBrandChange = (brandId) => {
		const isSelected = selectedBrands.includes(brandId);

		if (isSelected) {
			onBrandChange(selectedBrands.filter((id) => id !== brandId));
		} else {
			onBrandChange([...selectedBrands, brandId]);
		}
	};

	useEffect(() => {
		axios
			.get(`${API_URL}product/product_detail/`)
			.then((res) => {
				console.log(res.data);
				setProducts(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
		axios
			.get(API_URL + 'category/category/')
			.then((res) => {
				console.log(res.data.results[0].id);
				setCategories(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);



	useEffect(() => {
		axios
			.get(API_URL + 'category/brand/')
			.then((res) => {
				console.log(res.data.results[0].id);
				setBrands(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div id="aside" className="col-md-3">
			<div className="aside">
				<h3 className="aside-title">Categories</h3>
				<div className="checkbox-filter">
					{categories?.map((category, index) => (
						<div className="input-checkbox" key={category.id}>
							<input
								type="checkbox"
								id={`category-${category.id}`}
								checked={selectedCategories.includes(category.id)}
								onChange={() => handleCategoryChange(category.id)}
							/>
							<label htmlFor={`category-${category.id}`}>
								<span></span>
								{category.name}
								<small>(120)</small>
							</label>
						</div>
					))}
				</div>
			</div>

			<div className="aside">
				<h3 className="aside-title">Price</h3>
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
							onChange={(e) => {setMinPrice(e.target.value); updateMinPrice(e.target.value)}}
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
							onChange={(e) => {setMaxPrice(e.target.value); updateMaxPrice(e.target.value)}}
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

			{/* Rest of the code */}
			<div className="aside">
				<h3 className="aside-title">Brand</h3>
				<div className="checkbox-filter">
					{brands?.map((brand, index) => (
						<div className="input-checkbox" key={brand.id}>
							<input
								type="checkbox"
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
					))}
				</div>
			</div>

			<div className="aside">
				<h3 className="aside-title">Top selling</h3>
				{products?.map((product, index) => (
					<div key={index} className="product-widget">
						<div className="product-img">
							<img src={product?.image} alt="" />
						</div>
						<div className="product-body">
							<p className="product-category">{product?.category?.name}</p>
							<h3 className="product-name">
								<Link to={`/product/${product?.id}`}>{product?.name}</Link>
							</h3>
							<h4 className="product-price">
								${product?.price} <del className="product-old-price">${product?.cancel_price}</del>
							</h4>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
