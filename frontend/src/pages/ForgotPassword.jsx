import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operation/authAPIs';
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function submitHandler(event)
    {
        event.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));

    }

    return (
        <div className='text-white w-screen h-screen flex justify-center mt-[10rem]'>
            {
                !loading &&
                     (
                        <div className='lg:w-[40%] w-[60%] flex flex-col gap-5'>
                            <h1 className='text-3xl font-bold'>
                                {
                                    !emailSent ? "Reset your password" : "Check your Email"
                                }
                            </h1>

                            <p className='text-richblack-200'>
                                {
                                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        : `We have sent the reset email to ${email}`
                                }
                            </p>

                            <form onSubmit={submitHandler} className='flex flex-col gap-[2rem]'>
                                {
                                    !emailSent && (
                                        <label>
                                            <p>Email Address <sup className='text-[#F5004F] text-[13px]'>*</sup></p>
                                            <input className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow' type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter you email' required />
                                        </label>
                                    )
                                }

                                <button type='submit' className='text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>
                                    {
                                        !emailSent ? "  Reset Password" : "Resend Email"
                                    }
                                </button>
                            </form>

                            <div className='-mt-3'>
                            <Link to={'/login'} className="flex items-center gap-1">
                            <FaArrowLeftLong />
                                <p>Back to Login</p>
                            </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ForgotPassword
