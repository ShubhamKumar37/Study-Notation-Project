import React from 'react';
import ActionButton from './Button';
import HighLightText from './HighLightText';
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = (position, heading, subHeading, btn1, btn2, codeBlock, backgroundGradient, codeColor) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            {/* Section 1 */}
            <div>
                {heading}
                <p className='text-richblack-300 font-bold'>
                    {subHeading}
                </p>
                <div className='flex gap-7 mt-7'>
                    <ActionButton active={btn1.active} linkTo={btn1.linkTo}>
                        <div className='flex gap-3 items-center'>
                            {btn1.btnText}
                            <FaArrowRight />
                        </div>
                    </ActionButton>
                    <ActionButton active={btn2.active} linkTo={btn2.linkTo}>
                        {btn2.btnText}
                    </ActionButton>
                </div>
            </div>

            {/* Section 2 */}
            <div>
                
            </div>

        </div>
    )
}

export default CodeBlocks
