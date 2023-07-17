import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';

function Search() {
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');

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
                  <input className="input" placeholder="Search here"
                  value={keyword} onChange={(e) => setKeyword(e.target.value)}
                  />
                  <Link to={`/search/${keyword}`}>
                  <button className="search-btn">
                   <i className="fa fa-search"></i>
                  </button>
                  </Link>
              </form>
          </div>
      </div>
  )
}

export default Search