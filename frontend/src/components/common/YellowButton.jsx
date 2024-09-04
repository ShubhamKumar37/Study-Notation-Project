import React from 'react'

const YellowButton = ({ children, type }) => {
  return (
    <button type={type} className='text-center w-full text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>
      {children}
    </button>
  )
}

export default YellowButton
