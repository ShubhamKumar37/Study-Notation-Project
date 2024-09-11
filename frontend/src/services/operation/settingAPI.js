import toast from 'react-hot-toast';
import {userProfile} from '../apis';
import { setLoading } from '../../slices/authSlice';
import { apiConnector } from '../apiConnector';
import { setUser } from '../../slices/profileSlice';

const {UPDATE_PROFILE_PICTURE_USER, UPDATE_PROFILE_USER} = userProfile;

export function uploadProfilePicture(file)
{
    return async (dispatch) =>
    {
        dispatch(setLoading(true));
        try
        {
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_USER, file);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            console.log("this is actual response from server", response)

            dispatch(setUser({...response.data.data})); 
            localStorage.setItem("userExist", {...response.data.data});
            toast.success("File upload successfully");
        }
        catch(Error)
        {
            console.log("Error while uploading the file (frontend -> settingAPI.js)");
            toast.error("Image not uploaded")
        }
        dispatch(setLoading(false));
    }
}

export function uploadProfileInformation(data)
{
    return async (dispatch) =>
    {
        dispatch(setLoading(true));
        try
        {
            const response = await  apiConnector("PUT", UPDATE_PROFILE_USER, data);

            response.data.data.userDetails.additionalDetails = response.data.data.profileDetails;

            dispatch(setUser({
                ...response.data.data.userDetails,
                additionalDetails: {...response.data.data.profileDetails},
                image:  response.data.data.userDetails.image

            }));

            localStorage.setItem("userExist", response.data.data.userDetails);

            toast.success("Profile updated successfully");


        }
        catch(Error)
        {
            console.log(Error);
            console.log("Error occur while uploading the informaiton of user (frontend settingAPI.js)")
        }

        dispatch(setLoading(false));
    }
}