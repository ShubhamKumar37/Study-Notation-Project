import React from 'react'
import Frame from "../../../assets/Images/frame.png"

const AuthRight = ({banner}) => {
  return (
    <div className='relative w-[30rem]'>
      <img src={Frame} alt="Decorative Frame" className='absolute z-0 top-6 left-6' />
      <img src={banner} alt="Auth Banner" className='relative z-10'/>
    </div>
  )
}

export default AuthRight
