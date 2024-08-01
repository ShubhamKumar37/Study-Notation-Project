import React from 'react';
import ActionButton from './Button';
// import HighLightText from './HighLightText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ position, heading, subHeading, btn1, btn2, codeBlock, gradient, codeColor }) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            {/* Section 1 */}
            <div className='w-[50%]'>
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
            <div className=' relative text-center flex flex-row w-[40%] text-richblack-500 font-inter font-bold h-fit bg-richblack-800 border bg-opacity-40 border-richblack-800'>

                <div
                    className={`absolute top-6   w-[230.95px] h-[157.05px] ${gradient} rounded-full shadow-2xl blur-3xl bg-blend-screen left-[5%] opacity-30 z-0`}
                ></div>

                <div className='relative flex flex-col w-[4%] z-10'>
                    <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p>
                </div>

                <div className={`relative w-[90%] flex flex-col gap-2 font-bold font-mono text-white pr-2 text-start z-10`}>
                    <TypeAnimation
                        style={{ whiteSpace: "pre-line" }}
                        sequence={[codeBlock, 10000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        speed={60}
                    />
                </div>

            </div>

        </div>
    )
}

export default CodeBlocks;
