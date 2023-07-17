import React from 'react'
import { Link } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';


function ProductCard({product}) {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    return (
        <>
            <div className="col-md-4 col-xs-12">
                <div className="product">
                    <div className="product-img">
                        <img src={product.image} alt="" />
                        <div className="product-label">
                            <span className="sale">-30%</span>
                            <span className="new">NEW</span>
                        </div>
                    </div>
                    <div className="product-body">
                        <p className="product-category">
                            {product?.category?.name}
                        </p>
                        <h3 className="product-name">
                            <Link to={`/product/${product.id}`}>
                                {product?.name}
                            </Link>
                        </h3>
                        <h4 className="product-price">${
                            product?.price
                        } <del className="product-old-price">
                                ${product?.cancel_price}
                            </del></h4>
                        <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <div className="product-btns">
                            <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
                            <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
                        </div>
                    </div>
                    <div className="add-to-cart">
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}><i className="fa fa-shopping-cart"></i> add to cart</button>
                    </div>
                </div>
            </div>
            <div className="clearfix visible-sm visible-xs"></div>
        </>
    )
}

export default ProductCard