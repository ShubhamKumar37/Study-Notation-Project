import { useDispatch, useSelector } from "react-redux"
import OTPInput from "react-otp-input"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signup } from "../services/operation/authAPIs";
import toast from "react-hot-toast";

const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth);
    const [OTP, setOTP] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("This is signup data - >", signupData);


    function submitHandler(event) {
        event.preventDefault();
        // if (!signupData) {
        //     alert("First fill the signup form");
        //     navigate("/signup");
        // }
        console.log("aya 1", signupData);
        const { email, firstName, lastName, createPassword, confirmPassword, accountType } = signupData;
        console.log("aya 2");

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
        <div>
            {
                loading === false && (
                    <div className="text-white">
                        <h1>Verify Email</h1>
                        <p>A verification code has been sent to you. Enter code below</p>

                        <form onSubmit={submitHandler} className="text-black">
                            <OTPInput
                                value={OTP}
                                onChange={setOTP}
                                numInputs={6}
                                renderInput={(props) => (<input {...props} />)}
                                renderSeparator={<span>-</span>}
                            ></OTPInput>

                            <button type="submit" className="text-white">Verify Email</button>
                        </form>

                        <div>
                            <Link to={'/login'}>
                                <p>Back to Login</p>
                            </Link>

                            <button onClick={() => dispatch(sendOTP(signupData.email, navigate))}>Resend it </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail