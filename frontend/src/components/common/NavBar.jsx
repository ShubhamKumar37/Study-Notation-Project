import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'

const NavBar = () => {
    const location = useLocation();

    function matchRout(route) 
    {
        return matchPath(route, location.pathname);
    }

    return (
        <div className='relative border-b-[1px] border-richblack-500'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-row justify-between p-3 pb-4 items-center'>
                <div>
                    <Link to={"/"}>
                        <img src={Logo} alt="Logo" loading='lazy'/>
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
                                        : (<Link to={link?.path} key={index} className={`${matchRout(link?.path) ? "text-yellow-50": "text-richblack-50"}`}>{link.title}</Link>)
                                    }
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div>
                    {/* Login/Signup/dashboard/profilePic/Cart */}

                    
                </div>
            </div>
        </div>
    )
}

export default NavBar
