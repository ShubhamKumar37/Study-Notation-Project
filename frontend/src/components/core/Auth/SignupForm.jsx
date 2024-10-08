import React from 'react'
import { useState, useEffect } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
// import Button from '../homepage/Button';
import { sendOTP } from '../../../services/operation/authAPIs';
import data from '../../../data/countrycode.json';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setSignupData } from '../../../slices/authSlice';

const SignupForm = ({ role }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        countryCode: "+91",
        createPassword: "",
        confirmPassword: "",
    });

    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    function changeHandler(event) {
        const { value, name } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log(formData);

        if (formData.createPassword !== formData.confirmPassword) {
            toast.error("Write the correct password");
            return;
        }

        const signupData = {
            ...formData,
            accountType: role
        }



        dispatch(setSignupData(signupData));
        console.log(signupData);
        dispatch(sendOTP(formData.email, navigate));

        // dispatch(signup(signupData))


        setFormData({
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            countryCode: "+91",
            createPassword: "",
            confirmPassword: "",
        });
    }

    useEffect(() => {
        setShowPass1(false);
        setShowPass2(false);
    }, []);


    return (
        <div className='text-white'>


            <form className='flex flex-col gap-[1.5rem]' onSubmit={submitHandler}>
                <label className='flex flex-col gap-1'>
                    <div>
                        First Name
                        <sup className='text-[#F5004F] text-[13px]'>*</sup>
                    </div>
                    <input
                        className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                        type='text'
                        name='firstName'
                        placeholder='Enter first name'
                        id='firstName'
                        value={formData.firstName}
                        onChange={changeHandler}
                        required
                    />
                </label>
                <label className='flex flex-col gap-1'>
                    <div>
                        Last Name
                        <sup className='text-[#F5004F] text-[13px]'>*</sup>
                    </div>
                    <input
                        className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                        type='text'
                        name='lastName'
                        placeholder='Enter last name'
                        id='lastName'
                        value={formData.lastName}
                        onChange={changeHandler}
                        required
                    />
                </label>

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

                <div className='relative'>
                    <div>   
                        Phone Number
                        <sup className='text-[#F5004F] text-[13px]'>*</sup>
                    </div>
                    <label className='flex gap-[2rem]'>
                        <select
                            name='countryCode'
                            value={formData.countryCode}
                            onChange={changeHandler}
                            className=' p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow max-h-32 overflow-y-auto'
                            style={{
                                width: "72px"
                            }}
                        >
                            {
                                data.map((item, index) => (
                                    <option className=''
                                        key={index}
                                        value={item.code}
                                    >
                                        {item.code}
                                    </option>
                                ))
                            }
                        </select>
                        <label className='flex flex-col gap-1 w-full'>
                            <input
                                className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                                type='tel'
                                name='phoneNumber'
                                placeholder='1234 567890'
                                id='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={changeHandler}
                                required
                            />
                        </label>
                    </label>


                </div>

                <label className='relative w-full '>
                    <div>
                        Create Password
                        <sup className='text-[#F5004F]'>*</sup>
                    </div>
                    <input
                        className='p-2 py-2 w-full mt-1 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                        type={showPass1 ? "text" : "password"}
                        name='createPassword'
                        placeholder='Create new password'
                        id='createPassword'
                        value={formData.createPassword}
                        onChange={changeHandler}
                        required
                    />
                    <span
                        onClick={() => setShowPass1(!showPass1)}
                        className='absolute text-2xl -translate-x-9 translate-y-3 cursor-pointer'
                    >
                        {showPass1 ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                </label>
                <label className='relative w-full '>
                    <div>
                        Confirm Password
                        <sup className='text-[#F5004F]'>*</sup>
                    </div>
                    <input
                        className='p-2 py-2 w-full mt-1 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                        type={showPass2 ? "text" : "password"}
                        name='confirmPassword'
                        placeholder='Confirm password'
                        id='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        required
                    />
                    <span
                        onClick={() => setShowPass2(!showPass2)}
                        className='absolute text-2xl -translate-x-9 translate-y-3 cursor-pointer'
                    >
                        {showPass2 ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                </label>

                {/* Need work */}
                {/* <Button active={true} linkTo={"/signup"}>Create Account</Button> */}
                <button className='text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95 '>
                    Create Account
                </button>
            </form>



        </div>
    )
}

export default SignupForm
