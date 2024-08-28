import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import "../../../pages/allPageCSS.css";
import data from '../../../data/countrycode.json';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                phoneNo: "",
                countryCode: "+91",
            });
        }
    }, [isSubmitSuccessful, reset]);

    const submitContactForm = async (formData) => {
        setLoading(true);
        console.log(loading);
        console.log(formData);
        setLoading(false);
    }

    return (
        <div className='text-white'>
            <form onSubmit={handleSubmit(submitContactForm)} className='w-[30rem] mx-auto flex flex-col gap-[1rem]'>
                <div className='flex flex-col sm:flex-row justify-between'>
                    <label className='flex flex-col gap-2'>
                        <p>First Name</p>
                        <input
                            type="text"
                            name='firstName'
                            placeholder='Enter your first name'
                            className='sm:w-full w-[60%] p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            {...register("firstName", { required: true })}
                        />
                        {
                            errors.firstName && (<span>Please enter your first name</span>)
                        }
                    </label>
                    <label className='flex flex-col gap-2'>
                        <p>Last Name</p>
                        <input
                            type="text"
                            name='lastName'
                            placeholder='Enter your last name'
                            className='sm:w-full w-[60%]  p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            {...register("lastName", { required: true })}
                        />
                        {
                            errors.lastName && (<span>Please enter your name</span>)
                        }
                    </label>
                </div>

                <div className='flex flex-col gap-[1rem]'>
                    <label className='flex flex-col gap-2'>
                        <p>Email</p>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            className='sm:w-full w-[60%] p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            {...register('email', { required: true })}
                        />
                        {
                            errors.email && (<span>
                                Please enter a valid email address
                            </span>)
                        }
                    </label>

                    <div className='flex flex-col gap-2'>
                        <div>
                            Phone Number
                            <sup className='text-[#F5004F] text-[13px]'>*</sup>
                        </div>

                        <label className='flex gap-[2rem]'>

                            <select
                                name='countryCode'
                                className=' p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow max-h-32 overflow-y-auto'
                                style={{
                                    width: "72px"
                                }}
                                {...register("countryCode")}
                            >
                                {
                                    data.map((item, index) => (
                                        <option className=''
                                            key={index}
                                            value={item.code}

                                        >
                                            {item.code} - {item.country}
                                        </option>
                                    ))
                                }
                            </select>
                            <label className='flex flex-col gap-1 w-full'>
                                <input
                                    className='sm:w-full w-[50%]  text-white p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                                    type='tel'
                                    name='phoneNo'
                                    placeholder='1234 567890'
                                    {...register('phoneNo', {
                                        required: true,
                                        maxLength: {value: 10, message: "Phone number doesnot exceed 10 digits"},
                                        minLength: {value: 8, message: "Phone number are greater than 7 "}
                                    })}
                                />

                                {/* {
                                    errors.phoneNo && (<span>Please enter the phone number</span>)
                                } */}
                            </label>
                        </label>
                    </div>

                    <label className='flex flex-col gap-2'>
                        <p>Message</p>
                        <textarea
                            name='message'
                            placeholder='Enter your message'
                            rows="6"
                            cols="40"
                            className='sm:w-full w-[60%]  p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            {...register('message', { required: true })}

                        />
                        {
                            errors.message && (<span>Please donot leave the message empty</span>)
                        }
                    </label>
                </div>

                <button type='submit' className='text-center sm:w-full w-[60%]  text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>Send Message</button>
            </form>
        </div>
    )
}

export default ContactForm