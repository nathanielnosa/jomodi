/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../constants';
import { useAuth } from '../context/auth-context';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const { checkAuth, user, isAuthenticated, logout } = useAuth();
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [categoryTypes, setCategoryTypes] = useState([])
    const [categoryID, setCategoryID] = useState(null)


    useEffect(() => {
        axios.get(`${API_URL}category/category/`)
            .then(res => {
                const categories = res.data.results
                setCategories(categories)
            })
            .catch(err => {
                console.log(err)
            })
    }
        , [])

    useEffect(() => {
        axios.get(`${API_URL}category/${categoryID}/list`)
            .then(res => {

                const categoryType = res.data
                setCategoryTypes(categoryType)
            })
            .catch(err => {
                console.log(err)
            })
    }
        , [categoryID])


    console.log(user)

    return (

        <header className="header" style={{
            zIndex: 1
        }}>

            <div className="cont cont-1">
                <div className="flex-container">
                    <div className="">
                        <Link to='/'>
                            <h2 className="logo">Jomodi</h2>
                        </Link>
                    </div>
                    <div id="search" className="input-group search">
                        <button type="button" className="button-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input id="filter_name" type="text" name="search" value="" placeholder="Try Saree, Kurti or Search by Product Code" className="form-cont" />
                    </div>

                    <div className="flex-col-3">
                        <ul className="navbar-nav">
                            <li className="download">
                                <a href="#" className=""> <i className="fa-solid fa-mobile icon"></i>Download</a>
                                <ul className='dropdown'>
                                    <li><a className="" href="#"> Download from</a></li>
                                    <li><img src="/img/playstore.jpg" alt="" width="100%" /></li>
                                </ul>
                            </li>
                            <li className='download'>
                                <a href="">Become a Supplier</a>
                            </li>
                            <li className="download">
                                <a href="#" className="d-flex">
                                    <i className="fa-regular fa-user d-flex justify-content-center"></i>
                                    Profile</a>
                                <ul className='dropdown'>
                                    {
                                        user ? (
                                            <>
                                                <li><Link to='' className="dropdown-item"> Hello</Link></li>
                                                <li><Link to='/order' className="dropdown-item "> My Orders</Link></li>
                                                <li><Link to='/profile' className="dropdown-item "> My Profile</Link></li>
                                                <li><Link to='/wishlist' className="dropdown-item "> My Wishlist</Link></li>
                                                <hr />
                                                <li>
                                                    <p className="dropdown-item" href="">
                                                        <span onClick={() => logout()}>
                                                            <i className="fa-solid fa-bag-shopping ml-5"></i>
                                                            Sign Out
                                                        </span>

                                                    </p>

                                                </li>
                                            </>

                                        ) : (
                                            <>
                                                <li><a className="dropdown-item pr-3">To access your Jomodi account</a></li>
                                                <button type="button" className="btn btn-primary btn-md m-3"><Link to='/login' className="p-3 text-light" href="">Sign up</Link></button>

                                            </>

                                        )
                                    }

                                </ul>
                            </li>


                        </ul>

                    </div>
                    {/* <div className="flex-col-4">
                        <div className="flex-cont ">
                            <div className="">
                                <div className="desktop-itemm">
                                    <ul className="navar-nav mr-auto nav-linkss">
                                        <li className=" dropdown">

                                            <a className="" href="#" data-bs-toggle="dropdown">
                                                <i className="fa-regular fa-user d-flex justify-content-center"></i>
                                                <p>Profile</p>
                                            </a>
                                            <ul className="dropdown-menu menu">
                                                {
                                                    user ? (
                                                        <>
                                                            <li><Link to='' className="dropdown-item"> Hello</Link></li>
                                                            <li><Link to='/order' className="dropdown-item "> My Orders</Link></li>
                                                            <li><Link to='/profile' className="dropdown-item "> My Profile</Link></li>
                                                            <li><Link to='/wishlist' className="dropdown-item "> My Wishlist</Link></li>
                                                            <hr />
                                                            <li>
                                                                <p className="dropdown-item" href="">
                                                                    <span onClick={() => logout()}>
                                                                        <i className="fa-solid fa-bag-shopping ml-5"></i>
                                                                        Sign Out
                                                                    </span>

                                                                </p>

                                                            </li>
                                                        </>

                                                    ) : (
                                                        <>
                                                            <li><a className="dropdown-item pr-3">To access your Jomodi account</a></li>
                                                            <button type="button" className="btn btn-primary btn-lg m-3"><Link to='/login' className="p-3 text-light" href="">Sign up</Link></button>

                                                        </>

                                                    )
                                                }


                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className="nav-linksss">
                                <div className="vll">
                                    <Link to='/cart'>
                                        <i className="fa-solid fa-cart-shopping d-flex justify-content-center"></i>
                                        <p>Cart</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
            <div className="cont cont-2">

                <nav className="navbar navbar-expand-lg">
                    <div className="" id="navbarTogglerDemo01">
                        <ul className="navbar-nav mt-2 nav-links">
                            {
                                categories?.map((category, index) => (
                                    <li className="nav-item">
                                        <div className="desktop-item">
                                            <Link to={`/category/${category.id}/${category.name}`} className=""
                                                onMouseEnter={() => setCategoryID(category.id)}
                                            >{category?.name}</Link>
                                        </div>
                                        <div className="mega-box">
                                            <div className="content">
                                                <div className="flex-cont">
                                                    <div className="">
                                                        <header className="sub-header">All       {category?.name}</header>
                                                        <ul className="mega-links">
                                                            <li className="pr-5"><Link to="">View All</Link></li>
                                                        </ul>
                                                    </div>
                                                    {
                                                        categoryTypes?.types?.map((categoryType, index) => (
                                                            <div className="cont-colored">

                                                                <div className="rw">
                                                                    <header className="sub-header">
                                                                        {categoryType?.name}
                                                                    </header>
                                                                    <ul className="mega-links">
                                                                        <li><Link to=''>All {categoryType?.name}</Link></li>
                                                                        {
                                                                            categoryType?.subcategories?.map((subCategory, index) => (
                                                                                <li><Link to={`/subcategory/${subCategory.id}/${subCategory.name}`}>{subCategory?.name}</Link></li>
                                                                            ))
                                                                        }


                                                                    </ul>
                                                                </div>

                                                            </div>
                                                        ))

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }



                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}
