import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';

const UpdateProfileInformation = () => {

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setValue } = useForm();
    let profile = useSelector((state) => state.profile);
    profile = profile.user;
    console.log(profile);

    let { firstName, lastName } = profile;
    let { about, contactNumber, dateOfBith, gender } = profile.additionalDetails;
    const data = ["Male", "Female", "Others"];

    // console.table([firstName, lastName, about, contactNumber, dateOfBith, gender]);

    useEffect(() => {
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('about', about);
        setValue('contactNumber', contactNumber);
        setValue('dateOfBirth', dateOfBith);
        setValue('gender', gender ?? "Male");
    }, [firstName, lastName, about, contactNumber, dateOfBith, gender, setValue]);

    return (
        <div>
            <div>
                <h1>Profile Informaiton</h1>
            </div>

            <div>
                <form>
                    <div className='flex flex-row'>
                        <label>
                            <p>Enter your first name</p>
                            <input
                                type='text'
                                placeholder='First Name'
                                {...register("firstName", { required: true })}
                                name='firstName'
                                className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            />
                        </label>
                        <label>
                            <p>Enter your last name</p>
                            <input
                                type='text'
                                name='lastName'
                                {...register('lastName', { required: true })}
                                placeholder='Last Name'
                                className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            />
                        </label>
                    </div>


                    <div className='flex flex-row'>
                        <label className="flex gap-6">
                            <select
                                name="gender"
                                className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                                style={{ width: "80px" }}
                                {...register("gender")}
                            >
                                {data.map((item, index) => (
                                    <option key={index} >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <lable>
                            <p>Date of Birth</p>
                            <input
                                type='date'
                                name='dateOfBirth'
                                {...register('dateOfBirth', { required: true })}
                                className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'

                            />
                        </lable>

                    </div>

                    <div className='flex flex-row'>

                        <label>
                            <p>Contact Number</p>
                            <input
                                type='tel'
                                name='contactNumber'
                                {...register('contactNumber', { required: true })}
                                placeholder='Contact Number'
                                className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                            />
                        </label>

                        <label>
                            <p>About</p>
                            <textarea
                                name='about'
                                {...register('about', { required: true })}
                                placeholder='About'
                                className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                                rows={3}
                            />
                        </label>
                    </div>


                    <div>
                        <button>cancel</button>
                        <button>Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfileInformation
