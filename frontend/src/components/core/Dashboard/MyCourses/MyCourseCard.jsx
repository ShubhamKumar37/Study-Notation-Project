import React from 'react';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MyCourseCard = ({ course }) => {
    return (
        <tr className="bg-gray-900 hover:bg-gray-800 transition duration-200 ">
            {/* Course Name and Details */}
            <td className="p-4 flex items-start space-x-4 border-r border-richblack-500">
                <img src={course?.thumbnail} width={70} alt="course" className="rounded-md" />
                <div>
                    <h1 className="text-lg font-semibold">{course?.courseName}</h1>
                    <p className="text-sm text-gray-400 mb-2">{course?.courseDescription?.substr(0, 60)}...</p>
                    <p className="text-xs text-gray-500">Created: {new Date(course?.createdAt).toLocaleDateString()}</p>

                    {/* Published or Draft Label */}
                    <span
                        className={`px-2 py-1 mt-2 inline-block text-xs font-semibold rounded ${course?.isPublished ? 'bg-green-600' : 'bg-red-600'
                            }`}
                    >
                        {course?.isPublished ? 'Published' : 'Drafted'}
                    </span>
                </div>
            </td>

            {/* Course Duration */}
            <td className="p-4 text-center text-sm border-r border-richblack-500">
                {course?.duration || '20H 30min'}
            </td>

            {/* Course Price */}
            <td className="p-4 text-center text-sm border-r border-richblack-500">
                ₹{course?.price || 'Free'}
            </td>

            {/* Action Buttons (Edit, Delete) */}
            <td className="p-4 text-center flex items-center justify-center space-x-4 text-lg border-r border-richblack-500">
                <MdEdit className="text-gray-400 cursor-pointer hover:text-white" />
                <RiDeleteBin6Line className="text-gray-400 cursor-pointer hover:text-red-500" />
            </td>
        </tr>
    );
};

export default MyCourseCard;
