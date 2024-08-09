import React, { useEffect, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import Button from '../homepage/Button';

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: "", password: "",
    });
    const [showPass, setShowPass] = useState(false);


    function changeHandler(event) {
        const { value, name } = event.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    function submitHandler(event) {
        event.preventDefault();

        setFormData({
            email: "",
            password: "",
        });

        console.log(formData);
    }

    useEffect(() => {
        setShowPass(false);
    }, []);


    return (
        <div className='text-white'>
            <form className='bg-richblack-600' onSubmit={submitHandler}>
                <label>Email Address *
                    <input className='bg-richblack-400' type='email' name='email' placeholder='Enter email address' id='email' value={formData.email} onChange={changeHandler} required />
                </label>

                <label className='relative'>Password *
                    <input className='bg-richblack-400' type={`${showPass === false ? "password" : "text"}`} name='password' placeholder='Enter password' id='password' value={formData.password} onChange={changeHandler} required />
                </label>
                <span onClick={() => setShowPass(!showPass)} className='absolute -translate-x-5 translate-y-1'>
                    {
                        showPass === false
                            ? (<IoMdEyeOff className='w-fit cursor-pointer' />)
                            : (<IoMdEye className='w-fit cursor-pointer' />)
                    }
                </span>

                <div>
                    <Button active={true} linkTo={"verify-email"} >Login</Button>

                </div>
            </form>
        </div>
    )
}

export default LoginForm
