import React from 'react'

function StoreTop() {
  return (
      <div className="store-filter clearfix">
          <div className="store-sort">
              <label>
                  Sort By:
                  <select className="input-select">
                      <option value="0">Popular</option>
                      <option value="1">Recommended</option>
                        <option value="2">Price: Low to High</option>
                        <option value="3">Price: High to Low</option>
                        <option value="4">Newest Arrivals</option>
                  </select>
              </label>
          </div>
      </div>
  )
}

export default StoreTop