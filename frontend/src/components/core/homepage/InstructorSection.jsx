import React from 'react'
import ActionButton from './Button'
import HighLightText from './HighLightText'
import InstructorImage from "../../../assets/Images/Instructor.png"
import { FaArrowRight } from "react-icons/fa"
import "../../../pages/allPageCSS.css"

const InstructorSection = () => {
    return (
        <div className='text-white flex flex-row my-[7rem] w-[90%] mx-auto gap-[4rem]'>
            <div className='w-[52%] object-contain instructor-shadow'>
                <img src={InstructorImage} alt='instructor-png' />
            </div>

            <div className='flex flex-row items-center w-[47%]'>
                <div className='flex flex-col gap-[3rem]'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-[36px] font-semibold w-[80%] leading-[35px]'> Become an <HighLightText text={"Instructor"} cssNum={1} /></h2>
                        <p className='text-sm font-semibold text-richblack-400 w-[93%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    </div>
                    <div className='w-fit'>
                        <ActionButton active={true} linkTo={"/signup"}>
                        <div className='flex flex-row items-center gap-1'>
                            <p>Start Teaching Today</p>
                            <FaArrowRight />
                        </div>
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection
