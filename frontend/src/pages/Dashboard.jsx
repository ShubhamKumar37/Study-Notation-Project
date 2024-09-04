import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import MyProfile from '../components/core/Dashboard/MyProfile';

const Dashboard = () => {

    const {loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading)
    {
        return <div className='text-white'>Loading...</div>
    }

  return (
    <div className='flex'>
        <Sidebar />
        <div>
            <div className='text-white'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard