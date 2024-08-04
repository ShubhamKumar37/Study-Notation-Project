import React from 'react'
import "../../../../pages/allPageCSS.css"

const ExploreSingleCard = ({ course, active }) => {
    return (
        <div className={`flex flex-col h-[14rem] cursor-pointer justify-between transition-all duration-300 ${active === true ? "bg-white text-black explore-more-card-shadow" : "bg-[#161D29]"}`}>
            <div className={`p-4`}>
                <h1 className={`text-2xl font-bold ${active === true ? "text-black" : "text-richblack-5"}`}>{course.heading}</h1>

                <p className={`text-[#585D69]`}>{course.description}</p>
            </div>

            <div>
                <div className='h-1 w-full border-t border-dashed border-richblack-100'></div>
                <div className={`py-2 px-4 flex flex-row justify-between`}>
                    <div>
                        <p className={`${active === true ? "text-blue-400" : "text-[#747b8a]"}`}>{course.level}</p>
                    </div>
                    <div>
                        <p className={`${active === true ? "text-blue-400" : "text-[#777e8e]"}`}>{course.lessionNumber}</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ExploreSingleCard
