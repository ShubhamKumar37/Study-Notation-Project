import React from 'react'
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from '../../../services/operation/authAPIs'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    if (profileLoading || authLoading) {
        return <div className='text-white'>Loading...</div>
    }

    return (
        <div>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-300 h-[calc(100vh-3.5rem)] bg-richblack-600 py-10'>
                <div className='flex flex-col gap-2'>
                    {
                        sidebarLinks.map((item, index) =>
                        {
                            if(item.type && user?.accountType !== item.type) return null;

                            return (<SidebarLink />)
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Sidebar
