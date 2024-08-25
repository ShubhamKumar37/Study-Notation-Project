import React from 'react'

const InfoBelt = () => {

    const beltData = [
        {title: "5K", subHead: "Active Student"},
        {title: "10+", subHead: "Mentor"},
        {title: "200+", subHead: "Courses"},
        {title: "50+", subHead: "Awards"},
    ];

  return (
    <div className='text-white'>
        <div className='flex flex-row'>
            {
                beltData && beltData.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-row'>
                            <h1>{item.title}</h1>
                            <h3>{item.subHead}</h3>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default InfoBelt
