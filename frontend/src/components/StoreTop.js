import React from 'react'

function StoreTop() {
  return (
      <div className="store-filter clearfix">
          <div className="store-sort">
              <label>
                  Sort By:
                  <select className="input-select">
                      <option value="0">Popular</option>
                      <option value="1">Position</option>
                  </select>
              </label>
          </div>
      </div>
  )
}

export default StoreTop