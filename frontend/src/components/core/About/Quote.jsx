import React from 'react'
import ColorText from './ColorText'

const Quote = () => {
  return (
    <div className='w-11/12 mx-auto text-lg sm:text-2xl text-center flex items-center border-b mb-[2rem] '>
      <p className='text-white w-[80%] mx-auto leading-7'>
      <span className='text-[2rem] text-richblack-300'>" </span> 
         We are passionate about revolutionizing the way we learn. Our innovative platform
        <ColorText text={"combines technology,"} color={"text-[#14D2FB]"} />
        <ColorText text={"expertise,"} color={"text-[#F67822]"} />
        and community to create an
        <ColorText text={"unparalleled educational experience."} color={"text-[#F2A916]"} />
      <span className='text-[2rem] text-richblack-300'>"</span>
      </p>
    </div>
  )
}

export default Quote