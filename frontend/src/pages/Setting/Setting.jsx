import React from 'react'
import UpdateProfileImage from './UpdateProfileImage'
import UpdateProfileInformation from './UpdateProfileInformation'

const Setting = () => {
  return (
    <div className='rounded-lg shadow-md p-[2rem]'>
      <div className=''>
        <h1>Setting</h1>
        <div className=''>
          <UpdateProfileImage />

          <UpdateProfileInformation />

        </div>

      </div>
    </div>
  )
}

export default Setting
