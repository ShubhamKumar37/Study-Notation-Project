import React from 'react'
import Frame from "../../../assets/Images/frame.png"

const AuthRightImage = ({image}) => {
  return (
    <div className='relative'>
      <img src={Frame} alt='grid' className='absolute z-0 top-6 left-6' />
      <img src={image} alt='random-student-photo' className='relative z-10'/>
    </div>
  )
}

export default AuthRightImage
