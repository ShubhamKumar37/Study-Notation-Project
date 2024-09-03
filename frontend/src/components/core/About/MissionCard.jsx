import React from 'react'

const MissionCard = ({obj}) => {
  return (
    <div className='p-4 flex flex-col gap-4  h-[293px]'>
        <div>
            <h1>{obj.title}</h1>
        </div>

        <div>
            <p>{obj.desc}</p>
        </div>
    </div>
  )
}

export default MissionCard