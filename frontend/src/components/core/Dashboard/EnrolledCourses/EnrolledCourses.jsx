import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../../services/apiConnector';
import { userProfile } from '../../../../services/apis';
import EnrolledCourseCard from './EnrolledCourseCard';

const EnrolledCourses = () => {
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
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl text-white font-semibold mb-4">Enrolled Courses</h2>
      {!enrolledCourses ? (
        <div className="text-white">...Loading</div>
      ) : !enrolledCourses.length ? (
        <p className="text-gray-400">You are not enrolled in any courses yet</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Table Structure */}
          <table className="min-w-full table-auto">
            {/* Table Headers */}
            <thead className="bg-richblack-500 text-white w-full text-left">
              <tr className=''>
                <th className="p-4 font-semibold">Course Name</th>
                <th className="p-4 font-semibold text-center">Duration</th>
                <th className="p-4 font-semibold">Progress</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {enrolledCourses.map((course, index) => (
                <EnrolledCourseCard course={course} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
