import React from 'react'
import HighLightText from './HighLightText'
import Image1 from "../../../assets/Images/Know_your_progress.png"
import Image2 from "../../../assets/Images/Compare_with_others.png"
import Image3 from "../../../assets/Images/Plan_your_lessons.png"
import ActionButton from './Button'

const LearningLanguageSection = () => {
    return (
        <div className='relative bg-[#F9F9F9] py-[5rem] pt-[10rem]'>
            <div className='relative w-11/12 mx-auto flex flex-col items-start sm:items-center gap-[1.5rem]'>
                <div className='sm:text-center flex flex-col gap-2'>
                    <div className='text-[36px] font-bold font-inter'>Your swiss knife for <HighLightText cssNum={1} text={"Learning any language"} /></div>
                    <div className='text-center'>
                        <p className='w-[80%] sm:mx-auto font-medium text-[16px]'>
                            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row '>
                    <img src={Image1} alt='know-your-progress' className='relative object-contain sm:w-[33%] sm:left-[7rem]'/>
                    <img src={Image2} alt='compare-with-other' className='relative object-contain sm:w-[33%] sm:left-1' />
                    <img src={Image3} alt='plan-your-leassons' className='relative object-contain sm:w-[33%] sm:right-[7.5rem]' />
                </div>

                <div className='-mt-5 mx-auto'>
                    <ActionButton active={true} linkTo={"/signup"}>Learn More</ActionButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection
