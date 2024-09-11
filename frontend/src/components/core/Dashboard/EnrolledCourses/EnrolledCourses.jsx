import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../../services/apiConnector';
import { userProfile } from '../../../../services/apis';
import EnrolledCourseCard from './EnrolledCourseCard';

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const {GET_STUDENT_ENROLLED_COURSE_USER} = userProfile;

    const [enrolledCourses, setEnrolledCourses] = useState(null);


    async function getEnrolledCourses()
    {
      try
      {
        const response = await apiConnector("GET", GET_STUDENT_ENROLLED_COURSE_USER, null, {Authorisation : `Bearer ${token}`});

        console.log(response?.data?.data);
        setEnrolledCourses(response.data.data.courses);
      } 
      catch(Error)
      {
        console.log(Error);
      }
    }

    useEffect(() =>
    {
      getEnrolledCourses();
    }, []);

  return (
    <div>
        <div>Enrolled Courses</div>
        {
          !enrolledCourses ? (<div>...Loading</div>)
          : !enrolledCourses.length ? (<p>You are not enrolled in any courses yet</p>)
          : (<div>

              <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>

              {
                enrolledCourses.map((course, index) =>
                {
                  return <EnrolledCourseCard course={course} key={index} />
                })
              }
          </div>)
        }
    </div>
  )
}

export default EnrolledCourses