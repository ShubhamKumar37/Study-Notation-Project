import React from 'react'

const RoleSlider = ({role, setRole, roleData}) => {

    function changeRole(roleIndex) {
        setRole(roleData[roleIndex]);
    }

    return (
        <div className='bg-richblack-800 w-fit py-1 px-[0.3rem] rounded-full '>
            <ul className='flex flex-row  gap-[1.2rem]  items-center'>
                {
                    roleData.map((item, index) => {
                        return (<li onClick={() => changeRole(index)} className={`cursor-pointer p-2 px-4 rounded-full transition-all duration-300 ${roleData[index] === role ? "bg-richblack-900 text-white" : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"}`} key={index}>{item}</li>)
                    })
                }
            </ul>
        </div>
    )
}

export default RoleSlider
