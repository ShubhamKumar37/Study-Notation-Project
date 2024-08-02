import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import "../../../pages/allPageCSS.css"

const timeLineData = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },
];

const TimeLineSection = () => {


    return (
        <div className='my-[3rem] w-[90%]'>
            <div className='flex flex-row gap-15 justify-between'>
                <div className='flex flex-col w-[40%]   '>
                    {
                        timeLineData.map((item, index) => {
                            return (
                                <div className='relative flex flex-col' key={index} >
                                    <div className='flex flex-row gap-3'>
                                        <div className='flex flex-row justify-center items-center rounded-full w-[50px] h-[50px] bg-white'>
                                            <img src={item.logo} alt="logo" />
                                        </div>
                                        
                                        <div>
                                            <h2 className='text-[18px] font-semibold'>{item.heading}</h2>
                                            <p className='text-base'>{item.description}</p>
                                        </div>
                                    </div>
                                    {
                                        
                                        index !== timeLineData.length - 1 ? <div className='relative border-l-[1px] border-[#AFB2BF] h-12 left-[1.5rem]  border-dashed my-2'></div> : ""
                                    }
                                </div>
                               
                            )
                        })
                    }

                </div>

                <div className='relative w-[56%]'>
                    <div className="absolute left-1/2 top-[25%] transform -translate-x-1/2 w-[120%] h-[50%] rounded-full bg-gradient-to-r from-[#68e8fe] via-[#65C7F7] to-[#0052D4] opacity-70 blur-[80px] z-0"></div>
                    <div className='hero-video-shadow object-cover relative z-10'>
                        <img src={TimeLineImage} alt='TimeLine' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLineSection
