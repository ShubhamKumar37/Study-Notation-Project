import { useDispatch, useSelector } from "react-redux"
import OTPInput from "react-otp-input"
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signup } from "../services/operation/authAPIs";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaClockRotateLeft } from "react-icons/fa6";

const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth);
    const [OTP, setOTP] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("This is signup data - >", signupData);


    function submitHandler(event) {
        event.preventDefault();
        if (!signupData) {
            toast.error("Signup data is incomplete");
            return; 
        }

        const { email, firstName, lastName, createPassword, confirmPassword, accountType } = signupData;

        dispatch(signup(
            email,
            firstName,
            lastName,
            createPassword,
            confirmPassword,
            OTP,
            navigate,
            accountType,
        ));
    }

    return (
        <div className="flex flex-col justify-center ">
            {
                loading === false && (
                    <div className="text-white  mt-[6rem] w-[27.5rem] ml-6 sm:mx-auto flex flex-col sm:items-center items-start gap-[2rem]">
                        <div className="flex items-start flex-col w-[80%]">
                            <h1 className="text-xl text-richblack-50">Verify Email</h1>
                            <p className=" text-richblack-200 w-[80%]">A verification code has been sent to you. Enter code below</p>
                        </div>

                        <form onSubmit={submitHandler} className="text-black flex flex-col gap-4 items-start">
                            <OTPInput
                                value={OTP}
                                onChange={setOTP}
                                numInputs={6}
                                renderInput={(props) => (<input {...props} placeholder="-"/>)}
                                inputStyle={{
                                    width: "50px",
                                    height: "40px",
                                    borderRadius: "6px",
                                    backgroundColor: "#161D29",
                                    color: "white",
                                    outline: "none",
                                }}

                                containerStyle={{
                                    display: "flex",
                                    gap: "0.7rem"
                                }}
                            />


                            <button type="submit" className="text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95">Verify Email</button>
                        </form>

                        <div className="flex flex-col sm:flex-row gap-[2rem] w-[80%] justify-between items-center">
                            <Link to={'/login'} className="flex items-center gap-1">
                            <FaArrowLeftLong />
                                <p>Back to Login</p>
                            </Link>

                            <button onClick={() => dispatch(sendOTP(signupData.email, navigate))} className="flex items-center gap-1 text-blue-300">
                                <FaClockRotateLeft />
                                <p>
                                    Resend it
                                </p>    
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail