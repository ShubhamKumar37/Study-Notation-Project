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
            <div className='flex flex-col lg:flex-row gap-15 justify-between'>
                <div className='flex flex-col lg:pb-[0rem] lg:mx-6 mx-auto  pb-[5rem]'>
                    {
                        timeLineData.map((item, index) => {
                            return (
                                <div className='relative flex flex-col' key={index} >
                                    <div className='flex flex-row gap-3 items-center'>
                                        <div className='flex flex-row justify-center items-center rounded-full w-[50px] h-[50px] bg-white'>
                                            <img src={item.logo} alt="logo" className=' w-[30px] h-[30px]' />
                                        </div>
                                        
                                        <div className=''>
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

                <div className='relative lg:w-[56%]'>
                    <div className="absolute left-1/2 top-[25%] transform -translate-x-1/2 lg:w-[120%] w-[100%] h-[50%] rounded-full bg-gradient-to-r from-[#68e8fe] via-[#65C7F7] to-[#0052D4] opacity-70 blur-[80px] z-0"></div>
                    <div className='lg:hero-video-shadow object-cover relative z-10'>
                        <img src={TimeLineImage} alt='TimeLine' />


                        <div className='absolute bg-caribbeangreen-700 justify-between translate-y-[-50%] flex flex-col h-[10rem] sm:h-fit sm:flex-row w-[17rem] sm:w-[25rem] gap-1 text-white uppercase p-7 left-[5%] sm:left-[14%] '>
                            <div className='text-3xl font-bold flex flex-row items-center sm:border-r border-caribbeangreen-300 gap-2 px-7'>
                                <p>10</p>
                                <p className='text-caribbeangreen-300 text-sm'>years of experience</p>
                            </div>

                            <div className='bg-caribbeangreen-300 w-[50%] mx-auto h-[1px] sm:hidden'></div>
                            <div className='text-3xl font-bold flex flex-row w-fit px-5 gap-4'>
                                <p>250</p>
                                <p className='text-caribbeangreen-300 text-sm'>types of courses</p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLineSection
