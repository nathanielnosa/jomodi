import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';

function Sidebar() {
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [products, setProducts] = useState([]);

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

	useEffect(() => {
		axios.get(API_URL + 'category/category/')
			.then(res => {
				console.log(res.data.results[0].id);
				setCategories(res.data.results);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios.get(API_URL + 'category/brand/')
			.then(res => {
				console.log(res.data.results[0].id);
				setBrands(res.data.results);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	return (
		<div id="aside" className="col-md-3">

			<div className="aside">
				<h3 className="aside-title">Categories</h3>
				<div className="checkbox-filter">

					{
						categories?.map((category, index) => (
							<div className="input-checkbox" key={category.id}>
								<input type="checkbox" id={`category-${category.id}`} />
								<label htmlFor={`category-${category.id}`}>
									<span></span>
									{category.name}
									<small>(120)</small>
								</label>
							</div>
						))
					}
				</div>
			</div>

			<div className="aside">
				<h3 className="aside-title">Price</h3>
				<div className="price-filter">
					<div id="price-slider"></div>
					<div className="input-number price-min">
						<input id="price-min" type="number" />
						<span className="qty-up">+</span>
						<span className="qty-down">-</span>
					</div>
					<span>-</span>
					<div className="input-number price-max">
						<input id="price-max" type="number" />
						<span className="qty-up">+</span>
						<span className="qty-down">-</span>
					</div>
				</div>
			</div>

			<div className="aside">
				<h3 className="aside-title">Brand</h3>
				<div className="checkbox-filter">
					{
						brands?.map((brand, index) => (
							<div className="input-checkbox">
								<input type="checkbox" id={`brand-${brand.id}`} />
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

export default Sidebar