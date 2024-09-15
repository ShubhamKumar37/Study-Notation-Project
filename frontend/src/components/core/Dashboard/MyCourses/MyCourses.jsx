import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../../services/apiConnector';
import { userProfile } from '../../../../services/apis';
import MyCourseCard from './MyCourseCard';

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const { GET_STUDENT_ENROLLED_COURSE_USER } = userProfile;

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  async function getEnrolledCourses() {
    try {
      const response = await apiConnector(
        'GET',
        GET_STUDENT_ENROLLED_COURSE_USER,
        null,
        { Authorization: `Bearer ${token}` }
      );
      setEnrolledCourses(response.data.data.courses);
    } catch (Error) {
      console.log(Error);
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="p-6  text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      
      <div className="overflow-x-auto  border border-richblack-300">
        <table className="min-w-full table-auto text-left">
          {/* Table Header */}
          <thead className="bg-richblack-500">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-300">Courses</th>
              <th className="p-4 text-sm font-semibold text-gray-300 text-center">Duration</th>
              <th className="p-4 text-sm font-semibold text-gray-300 text-center">Price</th>
              <th className="p-4 text-sm font-semibold text-gray-300 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {enrolledCourses &&
              enrolledCourses.map((course, index) => (
                <MyCourseCard course={course} key={index} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCourses;
