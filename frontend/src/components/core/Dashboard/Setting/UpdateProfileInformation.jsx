import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { uploadProfileInformation } from '../../../../services/operation/settingAPI';

const UpdateProfileInformation = () => {
    const { register, handleSubmit, setValue } = useForm();
    const profile = useSelector((state) => state.profile.user);  // Get user profile from state
    const dispatch = useDispatch();

    const { firstName, lastName } = profile;
    const { about, contactNumber, dateOfBirth, gender } = profile.additionalDetails;
    const data = ["Male", "Female", "Others"];

    // Format date of birth to yyyy-MM-dd for input field
    const formatDateOfBirth = (date) => {
        if (date) {
            const dob = new Date(date);
            const yyyy = dob.getFullYear();
            const mm = String(dob.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const dd = String(dob.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }
        return '';
    };

    const formattedDateOfBirth = formatDateOfBirth(dateOfBirth);

    // Set the initial form values using useEffect
    useEffect(() => {
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('about', about);
        setValue('contactNumber', contactNumber);
        setValue('dateOfBirth', formattedDateOfBirth);
        setValue('gender', gender ?? "Male");
    }, [firstName, lastName, about, contactNumber, formattedDateOfBirth, gender, setValue]);

    async function submitFormData(data) {

        try
        {
            dispatch(uploadProfileInformation(data));
        }
        catch(Error)
        {
            console.log(Error);
            console.log("Error occur while submiting the form in async function");
        }


    }

    return (
        <div className="bg-richblack-800 flex-col items-start md:jsutify-center gap-[1.5rem] py-[1rem] px-[2rem] rounded-xl shadow-richblack-600 shadow-sm">
            <div>
                <h1 className="text-white font-bold text-lg mb-4">Profile Information</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(submitFormData)}>
                    {/* First Name and Last Name */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <label className="flex-1 w-full">
                            <p className="text-white mb-2">First Name</p>
                            <input
                                type="text"
                                placeholder="First Name"
                                {...register("firstName")}
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg"
                            />
                        </label>
                        <label className="flex-1">
                            <p className="text-white mb-2">Last Name</p>
                            <input
                                type="text"
                                placeholder="Last Name"
                                {...register("lastName")}
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg"
                            />
                        </label>
                    </div>

                    {/* Gender and Date of Birth */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <label className="flex-1">
                            <p className="text-white mb-2">Gender</p>
                            <select
                                {...register("gender")}
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg"
                            >
                                {data.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex-1">
                            <p className="text-white mb-2">Date of Birth</p>
                            <input
                                type="date"
                                {...register("dateOfBirth")}
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg"
                            />
                        </label>
                    </div>

                    {/* Contact Number and About */}
                    <div className="flex flex-col gap-4 mb-4">
                        <label>
                            <p className="text-white mb-2">Contact Number</p>
                            <input
                                type="tel"
                                {...register("contactNumber")}
                                placeholder="Contact Number"
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg"
                            />
                        </label>

                        <label>
                            <p className="text-white mb-2">About</p>
                            <textarea
                                {...register("about")}
                                placeholder="About"
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg"
                                rows={3}
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row justify-end gap-4">
                        <Link to="/dashboard/my-profile">
                            <button
                                type="button"
                                className="text-center text-richblack-5 w-full text-[13px] px-6 py-3 rounded-md font-bold bg-richblack-800 button-shadow-black  transition-all duration-200 hover:scale-95"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className=" text-center  text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95"
                        >
                            Save
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileInformation;
