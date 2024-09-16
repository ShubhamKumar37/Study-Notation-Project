import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../../../services/apiConnector';
import { categories } from '../../../../../services/apis';
import "../../../../../pages/allPageCSS.css"

const CourseInformationForm = () => {

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
            setValue("courseCategory", course.category);
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
            <lable>
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
            </lable>

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

            <lable>
                <p>Course Price</p>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    pattern="^\d+(\.\d+)?$"
                    placeholder='Enter course price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow"
                />
                {
                    errors.coursePrice && (<span>Please add cost of your course**</span>)
                }
            </lable>
        </form>
    )
}

export default CourseInformationForm