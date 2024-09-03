import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const {loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading)
    {
        return <div className='text-white'>Loading...</div>
    }

  return (
    <div>
        <Sidebar />
        <div>
            <div className='text-white'>
                {/* <Outlet /> */}
                <h1>THello</h1>
            </div>
        </div>
    </div>
  )
}

export default Dashboard