import React, { useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import "../../../pages/allPageCSS.css";
import { login } from '../../../services/operation/authAPIs';
import { useDispatch } from 'react-redux';

const LoginForm = ({ role }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPass, setShowPass] = useState(false);

    function changeHandler(event) {
        const { value, name } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();

        formData.accountType = role;

        console.log("This is form data - ", formData);

        dispatch(login(formData.email, formData.password, navigate));

        setFormData({
            email: "",
            password: "",
        });
    }

    useEffect(() => {
        setShowPass(false);
    }, []);

    return (
        <div className='text-white'>
            <form className='flex flex-col gap-[2rem]' onSubmit={submitHandler}>
                <label className='flex flex-col gap-1'>
                    <div>
                        Email Address
                        <sup className='text-[#F5004F] text-[13px]'>*</sup>
                    </div>
                    <input
                        className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                        type='email'
                        name='email'
                        placeholder='Enter email address'
                        id='email'
                        value={formData.email}
                        onChange={changeHandler}
                        required
                    />
                </label>

                <label className='relative w-full '>
                    <div>
                        Password
                        <sup className='text-[#F5004F]'>*</sup>
                    </div>
                    <input
                        className='p-2 py-2 w-full mt-1 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                        type={showPass ? "text" : "password"}
                        name='password'
                        placeholder='Enter password'
                        id='password'
                        value={formData.password}
                        onChange={changeHandler}
                        required
                    />
                    <span
                        onClick={() => setShowPass(!showPass)}
                        className='absolute text-2xl -translate-x-9 translate-y-3 cursor-pointer'
                    >
                        {showPass ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                    <div className='text-blue-300 flex justify-end cursor-pointer'>
                        <Link to="/forgot-password">
                            Forgot password
                        </Link>
                    </div>
                </label>

                <button type='submit' className='text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
