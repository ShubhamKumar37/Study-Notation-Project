import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react';

const EnrolledCourseCard = ({ course }) => {
  return (
    <tr className="bg-gray-800 text-white mb-4 rounded-lg md:mb-0 md:even:bg-gray-700 md:odd:bg-gray-800 md:dark:even:bg-gray-900 md:dark:odd:bg-gray-800">
      {/* Course Thumbnail */}
      <td className="flex items-center space-x-4 p-4">
        <img
          src={course?.thumbnail}
          width={50}
          height={50}
          className="rounded-md"
          alt="Course Thumbnail"
        />
        <div>
          <h1 className="text-lg font-semibold">{course?.courseName}</h1>
          <p className="text-sm text-gray-400">{course?.courseDescription?.substr(0, 30)}...</p>
        </div>
      </td>

      {/* Course Duration */}
      <td className="p-4 text-center md:text-left">
        <p>{course?.duration || '2hr 30 mins'}</p>
      </td>

      {/* Progress Bar */}
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <p className="text-white text-sm">{`Progress ${course?.progressPercentage || 30}%`}</p>
          <ProgressBar
            completed={course?.progressPercentage || 30}
            height="8px"
            isLabelVisible={false}
            bgColor="#10B981"
            baseBgColor="#4B5563"
            className="w-full"
          />
        </div>
      </td>
    </tr>
  );
};

export default EnrolledCourseCard;
