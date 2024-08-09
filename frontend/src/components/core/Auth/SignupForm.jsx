import React from 'react'
import { useState, useEffect } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
// import Button from '../homepage/Button';
import data from '../../../data/countrycode.json';

const SignupForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            <form className='flex flex-col gap-[2rem]' onSubmit={submitHandler}>
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

                <label>
                    <select
                        name='countryCode'
                        value={formData.countryCode}
                        onChange={changeHandler}
                        className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow max-h-32 overflow-y-auto'
                    >
                        {
                            data.map((item, index) => (
                                <option
                                    key={index}
                                    value={item.code} 
                                >
                                    {item.code}
                                </option>
                            ))
                        }
                    </select>
                </label>


                <label className='flex flex-col gap-1'>
                    <div>
                        Phone Number
                        <sup className='text-[#F5004F] text-[13px]'>*</sup>
                    </div>
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
                <button className=''>
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm
