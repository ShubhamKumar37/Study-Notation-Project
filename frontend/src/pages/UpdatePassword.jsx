import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operation/authAPIs';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [formData, setFormData] = useState(
    { password: "", confirmPassword: "" }
  );

  function changeHandler(Event) {
    setFormData((prev) => {
      return {
        ...prev,
        [Event.target.name]: Event.target.value
      }
    })
  }

  function submitHandler(Event) {
    Event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password doesnot match");
    }

    const token = location.pathname.split('/');
    console.log("This is the token = ", token);

    dispatch(resetPassword(formData.password, formData.confirmPassword, token[token.length - 1], navigate));
  }


  return (
    <div>
      {
        loading === false && 
          (
            <div className='text-white'>
              <h1>Choose New Password</h1>
              <p>Almost done. Enter your new password and youre all set.</p>

              <form onSubmit={submitHandler}>
                <label>
                  <p>Enter New password</p>
                  <input className='w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                    name={`password`}
                    type={`${showPass1 === true ? "text" : "password"}`}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='New password'
                    required
                  />
                  <span
                        onClick={() => setShowPass1(!showPass1)}
                        className='absolute text-2xl -translate-x-9 translate-y-3 cursor-pointer'
                    >
                        {showPass1 ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                </label>


                <label>
                  <p>Enter Confirm password</p>
                  <input className=' w-full p-2 py-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                    type={`${showPass2 === true ? "text" : "password"}`}
                    name={`confirmPassword`}
                    placeholder={`Confirm password`}
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    required
                  />
                  <span
                        onClick={() => setShowPass2(!showPass2)}
                        className='absolute text-2xl -translate-x-9 translate-y-3 cursor-pointer'
                    >
                        {showPass2 ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                </label>

                <button type='submit' className='text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>
                  Login
                </button>
              </form>
            </div>
          )
      }
    </div>
  )
}

export default UpdatePassword

