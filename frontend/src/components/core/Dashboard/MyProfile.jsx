import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';

const MyProfile = () => {
  
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
  
    return (
    <div>
        <h1>My Profile</h1>

        <div>
            <div>
                <img src={`${user?.image}`}/>
                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <IconButton />
        </div>


    </div>
  )
}

export default MyProfile
