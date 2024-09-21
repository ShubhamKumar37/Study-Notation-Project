import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../../services/apiConnector';
import { categories } from '../../../../../services/apis';
import "../../../../../pages/allPageCSS.css"
import RequirementField from './RequirementField';
import ChipInput from './ChipInput';
import { setStep } from '../../../../../slices/courseSlice';

const CourseInformationForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        setValue,
        getValues,
        formState: {
            errors,
        }, handleSubmit
    } = useForm();

    const { course, editCourse } = useSelector((state) => state.course);
    const { loading } = useSelector((state) => state.auth);
    const { GET_ALL_CATEGORIES_API } = categories;
    const [courseCategory, setCourseCategory] = useState([]);

    async function getAllCategory() {
        try {
            const response = await apiConnector("GET", GET_ALL_CATEGORIES_API)
            setCourseCategory(response.data.category);
            console.log("This is the reponse for all category =>", courseCategory);
        }
        catch (Error) {
            console.log("Error occur while fetching data from backend for course categories", Error);
        }
    }

    useEffect(() => {
        getAllCategory();

        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("category", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

    }, []);

    function submitForm(event) {
        event.preventDefault();

    }

    return (
        <form onSubmit={submitForm}
            className='flex flex-col gap-[2rem]'
        >
            <label>
                <p>Course Title</p>
                <input
                    type="text"
                    placeholder='Enter course title'
                    {...register("courseTitle", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                />
                {
                    errors.courseTitle && (<span>Please add the course title**</span>)
                }
            </label>

            <label>
                <p>Course Description</p>
                <textarea
                    rows={3}
                    placeholder='Enter some description about your course'
                    {...register("courseShortDesc", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                />
                {errors.courseShortDescription && <span>Please add a single line description at least**</span>}
            </label>

            <label>
                <p>Course Price</p>
                <input
                    type="number"
                    step="1"
                    min="0"
                    placeholder='Enter course price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                />
                {
                    errors.coursePrice && (<span>Please add cost of your course**</span>)
                }
            </label>

            <label>
                <p>Select category</p>
                <select
                    {...register("category", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                >
                    <option value="" disabled>Choose a category</option>
                    {
                        courseCategory && courseCategory.map((item, index) => {
                            return <option key={index} >{item.name}</option>
                        })
                    }
                </select>
                {errors.category && <span>Please choose a category**</span>}
            </label>

            <ChipInput
                name="courseTags"
                register={register}
                errors={errors}     
                getValues={getValues}
                setValue={setValue}
                label="Course Tags"
            
            />

            {/* A new component for thumbnail and its preview */}


            <label>
                <p>Benefits of the course</p>
                <textarea
                    rows={3}
                    {...register("courseBenefits", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                />
            </label>
            {errors.courseBenefits && <span>Please add some Benefits of the course**</span>}

            <RequirementField
                name="courseRequirements"
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                label="Course Requirements"
            />


            <div>
                editCourse && (
                    <button type='submit'
                        className='flex flex-row items-center text-center w-full text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'
                        onClick={() => dispatch(setStep(1))}>Continue without saving</button>
                    <button
                    className='flex flex-row items-center text-center w-full text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'
                    >{!editCourse ? "Next" : "Save changes"}</button>
                )
            </div>
        </form>
    )
}

export default CourseInformationForm