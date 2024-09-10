import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useOutClick from '../../../hooks/useOutClick';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operation/authAPIs';

const ProfileDropDown = () => {
    const [dropMenu, setDropMenu] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();
    let userImage = useSelector((state) => state.profile.user.image);

    useOutClick(ref, () => setDropMenu(false));

    function logoutHandler()
    {
        setDropMenu(false);
        dispatch(logout());
    }

    return (
        <div className="relative text-richblack-100">
            <button
                onClick={() => setDropMenu(!dropMenu)}
                className="flex items-center"
            >
                <img
                    src={`${userImage === null ? "https://via.placeholder.com/50" : userImage}`}
                    alt="profile"
                    className="w-[2.5rem] h-[2.5rem] aspect-square rounded-full object-cover"
                />
            </button>

            {/* Dropdown Menu */}
            <div
                ref={ref}
                className={`absolute bg-richblack-700 divide-richblack-400 divide-y-[1px] top-[3rem] -left-8 rounded-lg transition-all duration-200 ease-in-out origin-top transform ${
                    dropMenu ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
                style={{
                    transformOrigin: 'top',
                    transitionProperty: 'transform, opacity',
                }}
            >
                <div className="p-3">
                    <Link to="/dashboard/my-profile">
                        <p className=' hover:text-richblack-5'>Dashboard</p>
                    </Link>
                </div>
                <div className="p-3">
                    <Link to="/" onClick={logoutHandler}>
                        <p className=' hover:text-richblack-5'>Logout</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropDown;
