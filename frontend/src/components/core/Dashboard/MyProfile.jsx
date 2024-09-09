import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import YellowButton from '../../common/YellowButton';
import { FiEdit } from "react-icons/fi";

export default function MyProfile() {
  let{ user } = useSelector((state) => state.profile);
  user = JSON.parse(localStorage.getItem("userExist"));
  console.log("this is the user", user);
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-800 text-white rounded-lg shadow-md p-[2rem] w-[95%] mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Info */}
      <div className='flex flex-col gap-[1rem]'>

        <div className="flex items-center mb-8 p-4 bg-richblack-800 rounded-lg shadow-md">
          <img
            src={`${user.image}`}
            alt="User"
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-4">
            <p className="text-xl font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-richblack-300">{user?.email}</p>
          </div>
          <button onClick={() => navigate('/dashboard/setting')} className="ml-auto">
            <YellowButton >
              <FiEdit className="mr-2" />
              <p>Edit</p>
            </YellowButton>
          </button>
        </div>

        {/* About Section */}
        <div className="mb-8 p-4 bg-richblack-800 rounded-lg shadow-md flex flex-col gap-[1rem]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">About</p>
            <button onClick={() => navigate('/dashboard/setting')}>
              <YellowButton>
                <FiEdit className="mr-2" />
                <p>Edit</p>
              </YellowButton>
            </button>
          </div>
          <p className="text-richblack-300 text-sm w-[70%]">{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
        </div>

        {/* Personal Details */}
        <div className="p-4 bg-richblack-800 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Personal Details</p>
            <button onClick={() => navigate('/dashboard/setting')}>
              <YellowButton>
                <FiEdit className="mr-2" />
                <p>Edit</p>
              </YellowButton>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-lg">First Name</p>
              <p className="font-semibold text-richblack-300 text-sm">{user?.firstName}</p>
            </div>

            <div>
              <p className="text-lg">Gender</p>
              <p className="font-semibold text-richblack-300 text-sm">{user?.additionalDetails?.gender ?? "Add gender"}</p>
            </div>

            <div>
              <p className="text-lg">Last Name</p>
              <p className="font-semibold text-richblack-300 text-sm">{user?.lastName}</p>
            </div>

            <div>
              <p className="text-lg">Phone number</p>
              <p className="font-semibold text-richblack-300 text-sm">{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
            </div>

            <div>
              <p className="text-lg">Date of Birth</p>
              <p className="font-semibold text-richblack-300 text-sm">{user?.additionalDetails?.dateOfBirth ?? "Add birthday"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
