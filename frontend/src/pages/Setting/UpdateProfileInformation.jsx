import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import { userProfile } from '../../services/apis';
import { setUser } from '../../slices/profileSlice';
import { setLoading } from '../../slices/authSlice';

const UpdateProfileInformation = () => {
    const { UPDATE_PROFILE_USER, UPDATE_PROFILE_PICTURE_USER } = userProfile;
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setValue } = useForm();
    let profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    profile = profile.user
    // console.log(profile);
    console.log(profile.user);

    let { firstName, lastName } = profile;
    let { about, contactNumber, dateOfBirth, gender } = profile.additionalDetails;
    const data = ["Male", "Female", "Others"];

    // Convert the dateOfBirth to the correct format (yyyy-MM-dd) for the input type="date"
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
    // console.log("Formatted date of birth:", formattedDateOfBirth);

    useEffect(() => {
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('about', about);
        setValue('contactNumber', contactNumber);
        setValue('dateOfBirth', formattedDateOfBirth);
        setValue('gender', gender ?? "Male");
    }, [firstName, lastName, about, contactNumber, formattedDateOfBirth, gender, setValue]);

    async function submitFormData(data) {
        // event.preventDefault();
        // console.log("this is the form data ", UPDATE_PROFILE_USER, UPDATE_PROFILE_PICTURE_USER );

        try {
            setValue('firstName', data.firstName);
            setValue('lastName', data.lastName);
            setValue('about', data.about);
            setValue('contactNumber', data.contactNumber);
            setValue('dateOfBirth', data.formattedDateOfBirth);
            setValue('gender', data.gender);
            const response = await apiConnector('PUT', UPDATE_PROFILE_USER, data);
            console.log("this is the response from server ", response.data.data.userDetails);
            dispatch(setLoading(true));
            dispatch(setUser({ ...response.data.data.userDetails, ...response.data.data.profileDetails, image: response.data.data.userDetails }));
            localStorage.setItem("userExist", JSON.stringify(response.data.data.userDetails));
            dispatch(setLoading(false));

        }
        catch (Error) {
            console.log("Error while updating the profile information");
            console.log(Error);
        }
    }

    return (
        <div className="p-6 bg-richblack-800 rounded-md">
            <div>
                <h1 className="text-white font-bold text-lg mb-4">Profile Information</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(submitFormData)}>
                    {/* First Name and Last Name */}
                    <div className="flex flex-row gap-4 mb-4">
                        <label className="flex-1 w-full">
                            <p className="text-white mb-2">Enter your first name</p>
                            <input
                                type="text"
                                placeholder="First Name"
                                {...register("firstName")}
                                name="firstName"
                                className="p-2 bg-richblack-700 w-full text-white rounded-lg border-none focus:outline-none input-field-shadow"
                            />
                        </label>
                        <label className="flex-1">
                            <p className="text-white mb-2">Enter your last name</p>
                            <input
                                type="text"
                                name="lastName"
                                {...register("lastName")}
                                placeholder="Last Name"
                                className="p-2 bg-richblack-700 text-white rounded-lg border-none focus:outline-none input-field-shadow w-full"
                            />
                        </label>
                    </div>

                    {/* Gender and Date of Birth */}
                    <div className="flex flex-row gap-4 mb-4">
                        <label className="flex-1">
                            <p className="text-white mb-2">Gender</p>
                            <select
                                name="gender"
                                className="p-2 bg-richblack-700 text-white rounded-lg border-none focus:outline-none input-field-shadow w-full"
                                {...register("gender")}
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
                                name="dateOfBirth"
                                {...register("dateOfBirth")}
                                defaultValue={formattedDateOfBirth} // Set formatted date here
                                className="p-2 bg-richblack-700 text-white rounded-lg border-none focus:outline-none input-field-shadow w-full"
                            />
                        </label>
                    </div>

                    {/* Contact Number and About */}
                    <div className="flex flex-col gap-4 mb-4">
                        <label className="flex-1">
                            <p className="text-white mb-2">Contact Number</p>
                            <input
                                type="tel"
                                name="contactNumber"
                                {...register("contactNumber")}
                                placeholder="Contact Number"
                                className="p-2 bg-richblack-700 text-white rounded-lg border-none focus:outline-none input-field-shadow w-full"
                            />
                        </label>

                        <label className="flex-1">
                            <p className="text-white mb-2">About</p>
                            <textarea
                                name="about"
                                {...register("about")}
                                placeholder="About"
                                className="p-2 bg-richblack-700 text-white rounded-lg border-none focus:outline-none input-field-shadow w-full  "
                                rows={3}
                            />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row justify-end gap-4">
                        <Link to={'/dashboard/my-profile'}>
                            <button
                                className="relative text-center text-richblack-5 text-sm h-fit text-[10px] px-6 py-3 rounded-md bg-richblack-800 button-shadow-black transition-all duration-200 hover:scale-95 cursor-pointer"
                                type='button'
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            className=" text-center text-sm px-6 py-1 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95"
                            type="submit"
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
