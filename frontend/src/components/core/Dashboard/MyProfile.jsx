import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';


export default function MyProfile(){
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <div>
          <img src={`${user.image}`} alt="User" className='w-[5rem]' />
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


