import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { userAuth } from "../apis";
import { setLoading, setSignupData, setToken } from "../../slices/authSlice";


const { SIGNUP_USER, LOGIN_USER, SEND_OTP_USER, CHANGE_PASSWORD_USER, RESET_PASSWORD_TOKEN_USER, RESET_PASSWORD_USER } = userAuth;

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SEND_OTP_USER, { email });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            console.log(response);
            console.log(response.data);

            toast.success("OTP sent successfully");
            navigate("/verify-email");

        }
        catch (Error) {
            console.log("Error occur while sending otp ----->", Error);
            toast.error("Unable to send OTP");
        }

        dispatch(setLoading(false));
    }
}


export function signup(
    accountType,
    firstName,
    lastName,
    email,
    createPassword,
    confirmPassword,
    otp,
    navigate) {


    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_USER,
                {
                    accountType,
                    firstName,
                    lastName,
                    email,
                    createPassword,
                    confirmPassword,
                    otp
                });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successfully now Login");
            navigate("/login");
        }
        catch (Error) {
            console.log(Error);
            toast.error("Unable to signup try again later");
            navigate("/signup");
        }
        dispatch(setLoading(false));
    }
} 