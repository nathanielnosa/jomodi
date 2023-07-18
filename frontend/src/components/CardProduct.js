import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishActions';

function CardProduct({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
    };

    return (
        <div className="col-md-12 col-xs-12">
            <div className="product">
                <div className="product-img">
                    <img
                        src={product.image}
                        alt=""
                        style={{
                            width: '100%',
                            height: '300px',
                        }}
                    />
                    <div className="product-label">
                        <span className="sale">-30%</span>
                        <span className="new">NEW</span>
                    </div>
                </div>
                <div className="product-body">
                    <p className="product-category">{product?.category?.name}</p>
                    <h3 className="product-name">
                        <Link to={`/product/${product.id}`}
                        style={{
                            textDecoration: 'none',
                        }}
                        >{product?.name}</Link>
                    </h3>
                    <h4 className="product-price">
                        ${product?.price} <del className="product-old-price">${product?.cancel_price}</del>
                    </h4>
                    <div className="product-rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <div className="product-btns">
                        <button className="add-to-wishlist" onClick={() => handleAddToWishlist(product)}><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>


                        <button className="quick-view">
                            <Link to={`/product/${product.id}`}>
                                <i className="fa fa-eye"></i><span className="tooltipp">quick view</span>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="add-to-cart">
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                        <i className="fa fa-shopping-cart"></i>
                        add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;
