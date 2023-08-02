import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { Accordion, Text } from '@mantine/core';

function Sidebar({ max, min, selectedCategories, selectedBrands, onCategoryChange, onBrandChange, updateMaxPrice, updateMinPrice, products }) {
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	// const [products, setProducts] = useState([]);
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

	// useEffect(() => {
	// 	axios
	// 		.get(`${API_URL}product/product_detail/`)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setProducts(res.data.results);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

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
			.get(API_URL + 'category/brand-detail/')
			.then((res) => {
				console.log(res.data.results[0]?.id);
				setBrands(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	// Function to get the first 8 categories
	const getFirstEightCategories = () => {
		return categories.slice(0, 8);
	};

	// Function to get the remaining categories (excluding the first 8)
	const getRemainingCategories = () => {
		return categories.slice(8);
	};

	// State to keep track of whether to show all categories or just the first 8
	const [showAllCategories, setShowAllCategories] = useState(true);

	// Function to toggle showing all categories or just the first 8
	const handleToggleCategories = () => {
		setShowAllCategories(!showAllCategories);
	};

	// brand filter
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

	return (
		<div id="aside" className="col-md-3">

			<div className="aside">
				<Accordion radius="xl" defaultValue="customization">
					<Accordion.Item value="customization">
						<Accordion.Control style={{
							fontSize: "15px"
						}}>
							Categories
						</Accordion.Control>
						<Accordion.Panel>
							{
								!showAllCategories ? (
									<>
										{categories?.map((category, index) => (
											<div className="input-checkbox" key={category?.id}>
												<input
													type="checkbox"
													id={`category-${category?.id}`}
													checked={selectedCategories.includes(category?.id)}
													onChange={() => handleCategoryChange(category?.id)}
												/>
												<label htmlFor={`category-${category?.id}`}>
													<span></span>
													{category?.name}
													<small>({
														products?.filter((product) => product?.category?.id == category?.id).length
													})</small>
												</label>
											</div>
										))
										}
										<button onClick={handleToggleCategories}>Show Less</button>
									</>

								) : (
									<>
										{getFirstEightCategories()?.map((category, index) => (
											<div className="input-checkbox" key={category?.id}>
												<input
													type="checkbox"
													id={`category-${category?.id}`}
													checked={selectedCategories.includes(category?.id)}
													onChange={() => handleCategoryChange(category?.id)}
												/>
												<label htmlFor={`category-${category?.id}`}>
													<span></span>
													{category?.name}
													<small>({
														products?.filter((product) => product?.category?.id == category?.id).length
													})</small>
												</label>
											</div>
										))
										}
										{categories.length > 8 && (
											<button onClick={handleToggleCategories}>
												{`Show ${getRemainingCategories().length} more`}
											</button>
										)}

									</>
								)
							}
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
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
							Brand
						</Accordion.Control>
						<Accordion.Panel>
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
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>

			</div>
		</div>
	);
}

export default Sidebar;
