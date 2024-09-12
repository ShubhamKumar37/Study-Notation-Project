import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaFileUpload } from "react-icons/fa";
import toast from 'react-hot-toast';
import { uploadProfilePicture } from '../../../../services/operation/settingAPI';

const UpdateProfileImage = () => {

    let {user: userImage} = useSelector((state) => state.profile);
    userImage = userImage.image;
    const dispatch = useDispatch();     
    const [fileName, setFileName] = useState("Select");
    const [file, setFile] = useState(null);


    function changeHandler(event) {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFile(file);
        }
        else
        {
            setFileName("Select");
            setFile(null);
        }
    }

    async function submitHandler(event) 
    {
        event.preventDefault();

        if(!file)
        {
            toast.error("Image not selected"); 
            return ;
        }
        // dispatch(setLoading(true));
        const formData = new FormData();
        formData.append('image', file);

        dispatch(uploadProfilePicture(formData));
        // try{
            // console.log("this is the profile pic url", UPDATE_PROFILE_PICTURE_USER);
            // const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_USER, formData);
            // console.log('this is the resposne from uplaoding picture', response.data.data);
            // dispatch(setUser({ ...response.data.data}));
            
            // console.log("this is the response from --- only data image ", response.data.data.image);
            // localStorage.setItem("userExist", JSON.stringify(response.data.data));
            // setuserImage(response.data.data.image);
            // setFileName("Select");
            // setFile(null);
            
            // toast.success("File upload successfully");
        // }
        // catch(error)
        // {
        //     console.log("This is the error for uploading file  ------>", error);
        //     console.log("This is the error for uploading file  ------>", error.response.data);
        //     toast.error("Failed to uplaod");
        // }
        // dispatch( setLoading(false));
    }



    return (
        <div className='bg-richblack-800 flex flex-col  md:flex-row items-start md:jsutify-center gap-[1.5rem] py-[1rem] px-[2rem] rounded-xl shadow-richblack-600 shadow-sm'>
            <div className='mx-auto md:mx-0'>
                <img
                    src={ userImage }
                    alt="profile"
                    className="w-[5rem] aspect-square rounded-full object-cover"
                />
            </div>
            <div className='flex flex-col justify-center items-center md:mx-0 ms:items-start gap-5 mx-auto'>
                <p>Change Profile Image</p>
                <div>
                    {/* Select Image Button */}
                    <form onSubmit={submitHandler} className='flex w-full gap-2 h-fit' encType="multipart/form-data">
                        <label className='relative text-center text-richblack-5 text-sm  h-fit text-[10px] px-6 py-3 rounded-md  bg-richblack-800 button-shadow-black transition-all duration-200 hover:scale-95 cursor-pointer'>
                            {fileName.length > 6 ? fileName.substring(0, 10) + "..." : fileName}

                            {/* Invisible input that still captures clicks */}
                            <input
                                type="file"
                                name='image'
                                className='absolute inset-0 w-full h-full opacity-0'
                                onChange={changeHandler}
                                style={{ cursor: 'pointer' }} // Ensure pointer cursor over invisible input
                                hidden
                                // required
                            />
                        </label>

                        <button type='submit' className='w-full text-center text-sm px-6 py-1 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>
                            <div className='flex items-center justify-center gap-2' >
                                <p>Upload</p>
                                <FaFileUpload />
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfileImage
