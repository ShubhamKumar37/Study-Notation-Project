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
        <div className='flex flex-col gap-[3rem]'>
            <div className='flex flex-row justify-between'>
                {
                    steps.map((item, index) => {
                        return (
                            <div className='px-4' key={index}>
                                <div className={`${step === item.id
                                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                    } rounded-full w-[3rem] h-[3rem] flex items-center justify-center border-2 border-dashed flex-row  p-4`}>
                                    {
                                        step < item.id
                                            ? (<p className='w-[1rem] text-center'>{item.id}</p>)
                                            : (<p className='w-[1rem]'><FaCheck /></p>)
                                    }
                                </div>
                                <p>{item.title}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-full'>
                <div>{step === 1 && <CourseInformationForm />}</div>
                <div>{step === 2 && "CourseBuilderForm"}</div>
                <div>{step === 3 && "PublishForm"}</div>
            </div>
        </div>

    )
}

export default RenderSteps