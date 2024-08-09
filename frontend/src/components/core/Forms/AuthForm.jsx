import React from 'react'
import LoginForm from '../Auth/LoginForm'
import SignupForm from '../Auth/SignupForm'

const AuthForm = ({ type }) => {
  return (
    <div className='w-[85%]'>
      {
        type === "login"
        ? (<LoginForm />)
        : (<SignupForm />)
      }
    </div>
  )
}

export default AuthForm
