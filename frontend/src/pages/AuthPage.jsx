import React, { useState } from 'react'
import AuthRight from '../components/core/Auth/AuthRight'
import Image1 from "../assets/Images/signup.webp"
import Image2 from "../assets/Images/login.webp"
import Image3 from "../assets/Images/Instructor.png"
import AuthForm from '../components/core/Forms/AuthForm'
import RoleSlider from '../components/core/Auth/RoleSlider'
import LoginHead from '../components/core/Auth/LoginHead'
import SignupHead from '../components/core/Auth/SignupHead'


const AuthPage = ({type}) => {

    const roleData = ["Student", "Instructor"];
    const [role, setRole] = useState("Student");

  return (
    <div className='w-10/12 mx-auto flex flex-row gap-[3rem] mt-[3rem] text-white'>
            <div className='lg:w-[50%] w-[90%] mx-auto flex flex-col gap-[1.5rem]'>
                
                {
                    type === "login"
                    ? (<LoginHead role={role}/>)
                    : (<SignupHead role={role}/>)
                }

                <RoleSlider role={role} setRole={setRole} roleData={roleData} />

                <AuthForm type={type} role={role}/>
            </div>

            <div className='lg:block hidden'>
                <AuthRight banner={role === "Student" ? Image2 : (type === "login" ? Image1 : Image3)} />
            </div>
        </div>
  )
}

export default AuthPage
