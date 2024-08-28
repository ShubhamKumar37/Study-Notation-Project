import React from 'react'

const InfoBelt = () => {

    const beltData = [
        {title: "5K", subHead: "Active Student"},
        {title: "10+", subHead: "Mentor"},
        {title: "200+", subHead: "Courses"},
        {title: "50+", subHead: "Awards"},
    ];

  return (
    <div className='text-white min-h-[15rem] w-full bg-richblack-800 flex justify-center items-center my-[5rem]'>
        <div className='flex flex-row gap-[15rem]'>
            {
                beltData && beltData.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col text-center'>
                            <h1 className='text-2xl font-bold'>{item.title}</h1>
                            <h3 className='text-lg text-richblack-500'>{item.subHead}</h3>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default InfoBelt
