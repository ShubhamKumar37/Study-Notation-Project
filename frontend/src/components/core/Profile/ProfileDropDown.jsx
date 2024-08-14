import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useOutClick from '../../../hooks/useOutClick';

const ProfileDropDown = () => {
    const [dropMenu, setDropMenu] = useState(false);
    const ref = useRef();

    useOutClick(ref, () => setDropMenu(false));

    return (
        <div className="relative text-richblack-100">
            <button
                onClick={() => setDropMenu(!dropMenu)}
                className="flex items-center"
            >
                <img
                    src="https://via.placeholder.com/50"
                    alt="profile"
                    className="w-[2.5rem] rounded-full"
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
                    <Link to="/dashboard">
                        <p className=' hover:text-richblack-5'>Dashboard</p>
                    </Link>
                </div>
                <div className="p-3">
                    <Link to="/" onClick={() => setDropMenu(false)}>
                        <p className=' hover:text-richblack-5'>Logout</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropDown;
