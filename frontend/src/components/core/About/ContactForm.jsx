import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import "../../../pages/allPageCSS.css";
import data from '../../../data/countrycode.json';
import YellowButton from '../../common/YellowButton';

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
        <div className="text-white max-w-lg mx-auto py-10">
            <form onSubmit={handleSubmit(submitContactForm)} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* First Name Field */}
                    <label className="flex flex-col w-full">
                        <p className="mb-1 text-sm">First Name</p>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && <span className="text-red-500 text-xs">Please enter your first name</span>}
                    </label>

                    {/* Last Name Field */}
                    <label className="flex flex-col w-full">
                        <p className="mb-1 text-sm">Last Name</p>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && <span className="text-red-500 text-xs">Please enter your last name</span>}
                    </label>
                </div>

                {/* Email Field */}
                <label className="flex flex-col">
                    <p className="mb-1 text-sm">Email Address</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-red-500 text-xs">Please enter a valid email address</span>}
                </label>

                {/* Phone Number Field */}
                <div>
                    <div className="mb-1 text-sm">
                        Phone Number <sup className="text-[#F5004F]">*</sup>
                    </div>
                    <label className="flex gap-6">
                        <select
                            name="countryCode"
                            className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                            style={{ width: "80px" }}
                            {...register("countryCode")}
                        >
                            {data.map((item, index) => (
                                <option key={index} value={item.code}>
                                    {item.code} - {item.country}
                                </option>
                            ))}
                        </select>
                        <input
                            className="w-full text-white p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                            type="tel"
                            name="phoneNo"
                            placeholder="1234 567890"
                            {...register("phoneNo", {
                                required: true,
                                maxLength: { value: 10, message: "Phone number must not exceed 10 digits" },
                                minLength: { value: 8, message: "Phone number should be at least 8 digits" }
                            })}
                        />
                    </label>
                </div>

                {/* Message Field */}
                <label className="flex flex-col">
                    <p className="mb-1 text-sm">Message</p>
                    <textarea
                        name="message"
                        placeholder="Enter your message"
                        rows="6"
                        className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                        {...register("message", { required: true })}
                    />
                    {errors.message && <span className="text-red-500 text-xs">Please enter your message</span>}
                </label>

                {/* Submit Button */}
                <YellowButton type={"submit"} >Send message</YellowButton>
            </form>
        </div>

    )
}

export default ContactForm