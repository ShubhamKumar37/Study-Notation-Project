import React from 'react'
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './Forms/CourseInformationForm';


const steps = [
    {
        id: 1,
        title: "Course Information"
    },
    {
        id: 2,
        title: "Course Builder"
    },
    {
        id: 3,
        title: "Publish"
    },
];


const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);
    return (
        <div>
            {
                steps.map((item) => {
                    return (<div>
                        <div className={`${step === item.id
                            ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                            : "border-richblack-700 bg-richblack-800 text-richblack-300"}
                        } rounded-full w-[3rem] h-[3rem] flex items-center justify-center border-2
                             border-2 rounded-full border-dashed flex flex-row justify-center items-center w-fit p-4`}>
                            {
                                step < item.id
                                    ? (<p className='w-[1rem] text-center'>{item.id}</p>)
                                    : (<p className='w-[1rem]'><FaCheck /></p>)
                            }
                        </div>
                        <p>{item.title}</p>

                    </div>)
                })
            }
            {step === 1 && <CourseInformationForm />}
            {step === 2 && "CourseBuilderForm"}
            {step === 3 && "PublishForm"}
        </div>
    )
}

export default RenderSteps