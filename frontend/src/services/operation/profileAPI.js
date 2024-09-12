import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { userProfile } from "../apis";
import { useSelector } from "react-redux";
import { setCourse } from "../../slices/courseSlice";


const {GET_STUDENT_ENROLLED_COURSE_USER} = userProfile;

// const profile = useSelector((state) => state.course);

export function getUserEnrolledCourse({token})
{
    return async (dispatch) =>
    {
        try
        {
            const response = await apiConnector("PUT", GET_STUDENT_ENROLLED_COURSE_USER, null, {Authorisation : `Bearer ${token}`});

            if (!response.data.success) 
            {
                toast.error("Data is not fetched");
                throw new Error(response.data.message);
            }

            dispatch(setCourse(response.data.data.courses));
            console.log(response.data.data);
            toast.success("All enrolled course are fetched");

        }
        catch(Error)
        {
            console.log("Error occur while getting user course details", Error);
            toast.error("Error occur while fetching user course details");
        }
    }
}