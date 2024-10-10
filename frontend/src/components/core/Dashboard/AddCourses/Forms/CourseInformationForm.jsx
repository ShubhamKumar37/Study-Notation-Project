import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../../services/apiConnector';
import { categories } from '../../../../../services/apis';
import "../../../../../pages/allPageCSS.css"
import RequirementField from './RequirementField';
import ChipInput from './ChipInput';
import { setStep } from '../../../../../slices/courseSlice';
import ImagePreview from './ImagePreview';
import toast from 'react-hot-toast';
import { createCourse } from '../../../../../services/operation/courseAPI';

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

    function submitForm(data) {
        if (editCourse) {
            if (isFormUpdated()) {
                const formData = new FormData();

                formData.append("courseId", course._id);
                if (data.courseTitle) formData.append("courseName", data.courseTitle);
                if (data.courseShortDesc) formData.append("courseDescription", data.courseShortDesc);
                if (data.coursePrice) formData.append("price", data.coursePrice);
                if (data.courseTags) formData.append("tag", data.courseTags);
                if (data.courseBenefits) formData.append("whatYouWillLearn", data.courseBenefits);
                if (data.category) formData.append("category", data.category._id); // Append the category ID
                if (data.courseRequirements) formData.append("instructions", data.courseRequirements);
                if (data.courseThumbnail) formData.append("thumbnail", data.courseThumbnail[0]); // File handling

                // Log FormData entries
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

            } else {
                toast.error("No changes detected");
                return;
            }
        } else {
            if (!data.courseThumbnail || !data.courseTitle || !data.courseShortDesc || !data.coursePrice || !data.courseTags || !data.courseBenefits || !data.category || !data.courseRequirements) {
                toast.error("Please complete all the fields");
                return;
            }

            const courseData = {
                courseName: data.courseTitle,
                courseDescription: data.courseShortDesc,
                price: data.coursePrice,
                thumbnail: data.courseThumbnail,
                tag: data.courseTags,
                whatYouWillLearn: data.courseBenefits,
                category: data.category._id,
                instructions: data.courseRequirements
            };
            // const formData = new FormData();

            // formData.append("courseName", data.courseTitle);
            // formData.append("courseDescription", data.courseShortDesc);
            // formData.append("price", data.coursePrice);
            // formData.append("thumbnail", data.courseThumbnail); // Correct file handling
            // formData.append("tag", data.courseTags);
            // formData.append("whatYouWillLearn", data.courseBenefits);
            // formData.append("category", data.category);
            // formData.append("instructions", data.courseRequirements);

            // Log FormData entries
            // for (let [key, value] of formData) {
            //     console.log(key, value);
            // }

            // Dispatch or send formData to the server
            dispatch(createCourse(courseData));
            console.log("This is the form data ===> ", courseData)
        }
    }


    function isFormUpdated() {
        const currentFormState = getValues();

        if (currentFormState.courseTitle !== course.courseTitle ||
            currentFormState.courseShortDesc !== course.courseDescription ||
            currentFormState.coursePrice !== course.price ||
            // currentFormState.courseTags !== course.tag ||
            currentFormState.courseBenefits !== course.whatYouWillLearn ||
            currentFormState.category._id !== course.category._id ||
            currentFormState.courseRequirements !== course.instructions
            // currentFormState.courseImage !== course.thumbnail
        ) {
            return true;
        }
        return false;
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-[2rem]'
        >
            <label className="w-full">
                <p>Course Title</p>
                <input
                    type="text"
                    placeholder='Enter course title'
                    {...register("courseTitle", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow w-full"
                />
                {
                    errors.courseTitle && (<span className='text-[#ef0000]'>Please add the course title**</span>)
                }
            </label>

            <label className="w-full">
                <p>Course Description</p>
                <textarea
                    rows={3}
                    placeholder='Enter some description about your course'
                    {...register("courseShortDesc", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow w-full"
                />
                {errors.courseShortDescription && <span className='text-[#ef0000]'>Please add a single line description at least**</span>}
            </label>

            <label className="w-full">
                <p>Course Price</p>
                <input
                    type="number"
                    step="1"
                    min="0"
                    placeholder='Enter course price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow w-full"
                />
                {
                    errors.coursePrice && (<span className='text-[#ef0000]'>Please add cost of your course**</span>)
                }
            </label>

            <label className="w-full">
                <p>Select category</p>
                <select
                    {...register("category", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow w-full"
                >
                    <option value="" disabled>Choose a category</option>
                    {
                        courseCategory && courseCategory.map((item, index) => {
                            return <option key={index} value={item._id}>{item.name}</option>
                        })
                    }
                </select>
                {errors.category && <span className='text-[#ef0000]'>Please choose a category**</span>}
            </label>

            <ChipInput
                name="courseTags"
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                label="Course Tags"
                className="w-full"
            />

            {/* A new component for thumbnail and its preview */}
            <ImagePreview
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                name="courseThumbnail"
            />

            <label className="w-full">
                <p>Benefits of the course</p>
                <textarea
                    rows={3}
                    {...register("courseBenefits", { required: true })}
                    className="p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow w-full"
                />
            </label>
            {errors.courseBenefits && <span className='text-[#ef0000] mt-[-2rem]'>Please add some Benefits of the course**</span>}

            <RequirementField
                name="courseRequirements"
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                label="Course Requirements"
            />


            <div>
                {editCourse && (
                    <button type='submit'
                        className='flex flex-row items-center text-center w-full text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'
                    >Continue without saving</button>)}
                <button type='submit'
                    className='flex flex-row items-center text-center w-full text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'
                >{!editCourse ? "Next" : "Save changes"}</button>



            </div>
        </form>
    )
}

export default CourseInformationForm