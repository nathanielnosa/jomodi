import React from 'react'
import Sidebar from '../components/Sidebar'
import StoreTop from '../components/StoreTop'
import ProductCard from '../components/ProductCard'

function Store() {
  return (
    <div class="section">
      <div class="container">
        <div class="row">
          <Sidebar />

          <div id="store" class="col-md-9">

            <StoreTop />

            <div class="row">
              <ProductCard  />
            </div>
            <div class="store-filter clearfix">
              <span class="store-qty">Showing 20-100 products</span>
              <ul class="store-pagination">
                <li class="active">1</li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Store