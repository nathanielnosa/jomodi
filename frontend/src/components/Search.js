import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function Search() {
    const [categories, setCategories] = useState([]);

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

  return (
      <div className="col-md-6">
          <div className="header-search">
              <form>
                  <select className="input-select">
                      <option value="0">All Categories</option>
                      {
                            categories?.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                      }
                  </select>
                  <input className="input" placeholder="Search here" />
                  <button className="search-btn">Search</button>
              </form>
          </div>
      </div>
  )
}

export default Search