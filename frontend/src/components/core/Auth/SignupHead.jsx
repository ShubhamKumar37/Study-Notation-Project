import React from 'react'
import StyleText from './StyleText'

const SignupHead = ({role}) => {
    return (
        <div className='flex flex-col gap-1'>
            <h1 className='text-4xl font-bold'>Join the millions teaching and learning to code with StudyNotion for free</h1>
            <div className='min-h-[5rem]'> 
                <p className='text-[#AFB2BF] w-[80%]'>
                    {role === "Student"
                        ? (
                            <>
                                Build skills for today, tomorrow, and beyond. <StyleText text={"Education to future-proof your career."} />
                            </>
                        )
                        : (
                            <>
                                Discover your passions,
                                <br />
                                <StyleText text={"Be Unstoppable"} />
                            </>
                        )
                    }
                </p>
            </div>
        </div>
    )
}

export default SignupHead
