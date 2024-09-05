import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { userAuth } from "../apis";
import { setLoading, setSignupData, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

// eslint-disable-next-line
const { SIGNUP_USER, LOGIN_USER, SEND_OTP_USER, CHANGE_PASSWORD_USER, RESET_PASSWORD_TOKEN_USER, RESET_PASSWORD_USER } = userAuth;

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SEND_OTP_USER, { email });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            console.log(response.data);

            toast.success("OTP sent successfully");
            navigate("/verify-email");

        }
        catch (Error) {
            console.log("Error occur while sending otp ----->", Error);
            toast.error("Unable to send OTP");
            console.log(Error.response.data);
        }

        dispatch(setLoading(false));
    }
}


export function signup(
    email,
    firstName,
    lastName,   
    createPassword,
    confirmPassword,
    otp,
    navigate,
    accountType) {


    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_USER,
                {
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password: createPassword,
                    confirmPassword,
                    otp 
                });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successfully now Login");
            console.log("This is signup data", response.data);
            // navigate("/login");
        }
        catch (Error) {
            console.log(Error);
            console.log(Error.response.data);
            toast.error("Unable to signup try again later");
            navigate("/signup");
        }
        dispatch(setLoading(false));
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_USER, { email, password });
            console.log("This is the response from server", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token));
            dispatch(setUser({ ...response.data.userExist, image: response.data.userExist.image }));


            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("userExist", JSON.stringify(response.data.userExist));

            toast.success("Login successfully");
            navigate("/dashboard/my-profile");
        }
        catch (Error) {
            console.log("This is the error", Error.response.data);
            toast.error("Unable to login try again later");
        }

        dispatch(setLoading(false));
    }
}

export function getPasswordResetToken(email, setEmailSent)
{
    return async (dispatch) =>
    {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("PUT", RESET_PASSWORD_TOKEN_USER, {email});

            console.log(response);
            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }

            toast.success("Password reset email sent...");

            setEmailSent(true);
        }
        catch(Error)
        {
            console.log(Error);
            console.log(Error.response.data);
            toast.error(`Unable to send password reset link try again later`);
            toast.error(`May be this user ${email} doesnot exist, check entered email`);
        }

        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token, navigate)
{
    return async (dispatch) =>
    {
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("PUT", RESET_PASSWORD_USER, {password, confirmPassword, token});

            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }

            toast.success("Password reseted now try login");

            navigate("/login");
        }
        catch(Error)
        {
            console.log(Error);
            console.log(Error.response.data);
            console.log("Error occur while reseting the password");
            toast.error("Reset password failded");
        }

        dispatch(setLoading(false));
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setToken(null));
        dispatch(setSignupData(null));
        dispatch(setUser(null));
        dispatch(resetCart);
        localStorage.removeItem("userExist");
        localStorage.removeItem("token"); 
        navigate("/");
        
        toast.success("Logged out successfully");
        dispatch(setLoading(false));
    }
}