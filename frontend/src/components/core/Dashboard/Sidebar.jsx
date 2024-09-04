import React, { useState } from 'react'
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from '../../../services/operation/authAPIs'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return <div className='text-white'>Loading...</div>
    }

    return (
        <div>
            <div className='flex max-w-[222px] flex-col border-r-[1px] border-r-richblack-300 h-[calc(100vh-3.5rem)] bg-richblack-600 py-10'>
                <div className='flex flex-col gap-2'>
                    {
                        sidebarLinks.map((item) =>
                        {
                            if(item.type && user?.accountType !== item.type) return null;

                            return (<SidebarLink iconName={item.icon} link={item} key={item.id} />)
                        })
                    }

                </div>

                <div className='mx-auto mt-6 h-[1px] w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col'>
                    <SidebarLink 
                        link={{name: "Setting", path: "/dashboard/setting"}} iconName={"VscSettingGear"}
                    />

                    <button onClick={() =>setConfirmationModal(
                        {
                            text1: "Are you sure??",
                            text2: "You will be logged out of your account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () =>  setConfirmationModal(null)
                        })
                    }>
                        <div>
                            <VscSignOut className='text-lg' />
                            <span>Logout</span>
                        </div>

                    </button>

                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    )
}

export default Sidebar
