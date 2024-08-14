import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { CiShoppingCart } from 'react-icons/ci';
import ProfileDropDown from '../core/Profile/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';

const NavBar = () => {
    const location = useLocation();
    const [subLinks, setSubLinks] = useState();
    const { token } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    async function getAllCategory() {
        try {
            const result = await apiConnector('GET', categories.GET_ALL_CATEGORIES_API);
            setSubLinks(result.data.category);
            console.log('This is the result = ', result);
        } catch (Error) {
            console.log('Error while fetching all the category from the database');
            console.log(Error);
        }
    }

    function matchRout(route) {
        return matchPath(route, location.pathname);
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div className='relative z-50 border-b-[1px] border-richblack-500'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-row justify-between p-3 pb-4 items-center'>
                <div>
                    <Link to={'/'}>
                        <img src={Logo} alt='Logo' loading='lazy' />
                    </Link>
                </div>

                <div className='text-richblack-5'>
                    <ul className='flex flex-row gap-4'>
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className='text-richblack-50 relative'>
                                {link.title === 'Catalog' ? (
                                    <div className='relative flex items-center gap-2 group'>
                                        <p>{link.title}</p>
                                        <IoIosArrowDown />

                                        <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[20%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
                                    group-hover:opacity-100 lg:w-[300px]'>

                                            <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                            </div>
                                            {
                                                subLinks.length ? (
                                                    subLinks.map((subLink, index) => (
                                                        <Link to={`course/${subLink.name}`} key={index}>
                                                            <p>{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div></div>)
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={link?.path}
                                        key={index}
                                        className={`${matchRout(link?.path) ? 'text-yellow-50' : 'text-richblack-50'}`}
                                    >
                                        {link.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className='flex items-center gap-4'>
                        {profile && profile?.accountType !== 'Instructor' && (
                            <Link to={'/dashboard/cart'} className='relative'>
                                <CiShoppingCart />
                                {totalItems > 0 && <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center'>{totalItems}</span>}
                            </Link>
                        )}

                        {token !== null ? (
                            <>
                                <Link to={'/login'} className='rounded-md text-richblack-100 bg-richblack-800 border border-richblack-700 px-[12px] py-[8px]'>
                                    <button>Login</button>
                                </Link>
                                <Link to={'/signup'} className='ml-5 rounded-md text-richblack-100 bg-richblack-800 border border-richblack-700 px-[12px] py-[8px]'>
                                    <button>Signup</button>
                                </Link>
                            </>
                        ) : (
                            <ProfileDropDown />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
