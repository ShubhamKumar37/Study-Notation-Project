import React, { useState } from 'react'
import AuthRightImage from './AuthRightImage'
import Image1 from "../../../assets/Images/signup.webp"
import Image2 from "../../../assets/Images/login.webp"
import StyleText from './StyleText'
import AuthForm from '../Forms/AuthForm'

const Signup = () => {

    const roleData = ["Student", "Instructors"];
    const [role, setRole] = useState("Student");

    function changeRole(roleIndex) {
        setRole(roleData[roleIndex]);
    }

    return (
        <div className='flex flex-row gap-[5rem]'>
            <div>
                <div>
                    <h1>Welcome Back</h1>
                    <div>
                        <p className='text-white'>
                            {role === "Student"
                                ? (
                                    <>
                                        Build skills for today, tomorrow, and beyond. <StyleText text={"Education to future-proof your career."} />
                                    </>
                                )
                                : (
                                    <>
                                        Discover your passions, <StyleText text={"Be Unstoppable"} />
                                    </>
                                )
                            }
                        </p>
                    </div>

                </div>
                <div className='bg-richblack-800 w-fit py-1 px-[0.3rem] rounded-full '>
                    <ul className='flex flex-row  gap-[0.5rem]  items-center'>
                        {
                            roleData.map((item, index) => {
                                return (<li onClick={() => changeRole(index)} className={`font-bold cursor-pointer p-2 px-4 rounded-full transition-all duration-300 ${roleData[index] === role ? "bg-richblack-900 text-white" : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"}`}>{item}</li>)
                            })
                        }
                    </ul>
                </div>

                <AuthForm />
            </div>

            <div>
                <AuthRightImage image={role === "Student" ? Image2 : Image1} />
            </div>
        </div>
    )
}

export default Signup
