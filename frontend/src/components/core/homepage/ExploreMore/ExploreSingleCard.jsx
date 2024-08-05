import React from 'react'
import "../../../../pages/allPageCSS.css"
import { FaUsersLine } from "react-icons/fa6";
import { MdAccountTree } from "react-icons/md";

const ExploreSingleCard = ({ course, active }) => {
    return (
        <div className={`flex flex-col h-[16rem] cursor-pointer justify-between transition-all duration-300 ${active === true ? "bg-white text-black explore-more-card-shadow" : "bg-[#161D29]"}`}>
            <div className={`p-4`}>
                <h1 className={`text-2xl font-bold ${active === true ? "text-black" : "text-richblack-5"}`}>{course.heading}</h1>

                <p className={`text-[#585D69]`}>{course.description}</p>
            </div>

            <div>
                <div className='h-1 w-full border-t border-dashed border-richblack-100'></div>
                <div className={`py-2 px-4 flex flex-row justify-between ${active === true ? "text-blue-400" : "text-[#747b8a]"}`}>
                    <div className='flex flex-row gap-1 items-center font-bold text-lg'>
                        <FaUsersLine />
                        <p>{course.level}</p>
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <MdAccountTree />
                        <p>{course.lessionNumber} Lessons</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ExploreSingleCard
