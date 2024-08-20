import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operation/authAPIs';

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
        <div className='text-white'>
            {
                !loading &&
                     (
                        <div>
                            <h1>
                                {
                                    !emailSent ? "Reset your password" : "Check your Email"
                                }
                            </h1>

                            <p>
                                {
                                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        : `We have sent the reset email to ${email}`
                                }
                            </p>

                            <form onSubmit={submitHandler}>
                                {
                                    !emailSent && (
                                        <label>
                                            <p>Email Address *</p>
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

                            <div>
                                <Link to={"/login"}>
                                    <p>Back to login </p>
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ForgotPassword
