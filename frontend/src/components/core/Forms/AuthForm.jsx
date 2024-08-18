import React from 'react'
import LoginForm from '../Auth/LoginForm'
import SignupForm from '../Auth/SignupForm'

const AuthForm = ({ type, role }) => {
  return (
    <div className='w-[85%]'>
      {
        type === "login"
        ? (<LoginForm role={role}/>)
        : (<SignupForm role={role}/>)
      }
    </div>
  )
}

export default AuthForm
