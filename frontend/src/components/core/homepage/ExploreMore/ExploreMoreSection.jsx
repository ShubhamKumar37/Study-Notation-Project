import React, { useState } from 'react'
import { HomePageExplore } from "../../../../data/homepage-explore"
import HighLightText from '../HighLightText';
import ExploreCard from './ExploreCards';

const tabNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMoreSection = () => {

    const [tabName, setTabName] = useState(0);
    const [selectCourse, setSelectCourse] = useState(0);

    const changeTab = (index) => {
        setTabName(index);
        setSelectCourse(0);
    }



    return (
        <div className=' text-white w-11/12 ml-2 mx-auto '>
            <div className=' flex flex-col gap-[3rem] sm:items-center'>
                <div className='flex flex-col sm:items-center gap-4'>
                    <p className='text-4xl'>
                        Unlock the
                        <HighLightText text={"Power of Code"} />
                    </p>

                    <p className='text-richblack-300 text-sm'>Learn to Build Anything You Can Imagine</p>
                </div>

                <div className=' bg-richblack-800 w-fit py-1 px-[3rem] rounded-full hidden lg:block'>
                    <ul className='flex flex-row  gap-[1.5rem]  items-center'>
                        {
                            tabNames.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => changeTab(index)}
                                        className={`font-bold cursor-pointer p-2 px-4 rounded-full transition-all duration-300  ${index === tabName ? "bg-richblack-900 text-white" : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"}`}
                                    >{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                <ExploreCard courses={HomePageExplore[tabName].courses } selectCourse={selectCourse} setSelectCourse={setSelectCourse} />

            </div>
        </div>
    )
}

export default ExploreMoreSection
