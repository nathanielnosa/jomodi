import React from 'react'
import { Link } from 'react-router-dom'

function CardProduct({product}) {
    return (
        <>
            <div class="col-md-12 col-xs-12" style={{
                height:"1050px"
            }}>
                <div class="product">
                    <div class="product-img">
                        <img src={product.image} alt="" />
                        <div class="product-label">
                            <span class="sale">-30%</span>
                            <span class="new">NEW</span>
                        </div>
                    </div>
                    <div class="product-body">
                        <p class="product-category">
                            {product?.category?.name}
                        </p>
                        <h3 class="product-name">
                            <Link to='/product'>
                                {product?.name}
                            </Link>
                        </h3>
                        <h4 class="product-price">${
                            product?.price
                        } <del class="product-old-price">
                                ${product?.cancel_price}
                        </del></h4>
                        <div class="product-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-btns">
                            <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                            <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                        </div>
                    </div>
                    <div class="add-to-cart">
                        <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                    </div>
                </div>
            </div>
            <div class="clearfix visible-sm visible-xs"></div>
        </>
    )
}

export default CardProduct