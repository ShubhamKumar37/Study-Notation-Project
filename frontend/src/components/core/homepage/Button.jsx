import React from 'react'
import { Link } from 'react-router-dom'
import "../../../pages/allPageCSS.css"

const Button = ({children, active, linkTo}) => {
  return (
    <Link to={linkTo}>
        <div className={`text-center w-fit text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black button-shadow-yellow" : "bg-richblack-800 button-shadow-black"} transition-all duration-200 hover:scale-95`}>
            {children}

        </div>
    </Link> 
  )
}

export default Button
