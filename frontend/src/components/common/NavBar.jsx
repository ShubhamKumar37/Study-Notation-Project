import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {apiConnector} from '../../services/apiConnector'
import { categories } from '../../services/apis'

const NavBar = () => {
    const location = useLocation();
    const [subLinks, setSubLinks] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    async function getAllCategory() 
    {
        try
        {
            // const result = await apiConnector("GET", categories.GET_ALL_CATEGORIES_API);
            const result = await apiConnector("GET", categories.GET_ALL_CATEGORIES_API);
            setSubLinks(result.data.data);
            console.log("This is the result = ", result);
        }
        catch(Error)
        {
            console.log("Error while fetching all the category from the database");
            console.log(Error);
        }
    }

    function matchRout(route) {
        return matchPath(route, location.pathname);
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    return (
        <div className='relative border-b-[1px] border-richblack-500'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-row justify-between p-3 pb-4 items-center'>
                <div>
                    <Link to={"/"}>
                        <img src={Logo} alt="Logo" loading='lazy' />
                    </Link>
                </div>

                <div className='text-richblack-5'>
                    <ul className='flex flex-row gap-4'>
                        {
                            NavbarLinks.map((link, index) =>
                                <li className='text-richblack-50'>
                                    {
                                        link.title === "Catalog"
                                            ? (<div key={index} >{link.title}</div>)
                                            : (<Link to={link?.path} key={index} className={`${matchRout(link?.path) ? "text-yellow-50" : "text-richblack-50"}`}>{link.title}</Link>)
                                    }
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div>
                    {/* Login/Signup/dashboard/profilePic/Cart */}
                    <div>
                        {
                            profile && profile?.accountType !== "Instructor" &&
                            <Link to={"/dashboard/cart"} className='relative'>
                                <CiShoppingCart />
                                {
                                    totalItems > 0 && <span className=''>{totalItems}</span>
                                }
                            </Link>
                        }

                        {
                            token === null &&
                            <Link to={"/login"} className='rounded-md text-richblack-100 bg-richblack-800 border border-richblack-700 px-[12px] py-[8px]'>
                                <button>Login</button>
                            </Link>
                        }

                        {
                            token === null &&
                            <Link to={"/signup"} className=' ml-5 rounded-md text-richblack-100 bg-richblack-800 border border-richblack-700 px-[12px] py-[8px]'>
                                <button>Signup</button>
                            </Link>
                        }
                        {
                            token !== null &&
                            <ProfileDropDown />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar
