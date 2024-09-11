import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'

const EnrolledCourseCard = ({course}) => {
  return (
    <div>
        <div>
            <div>
                <img src={course?.thumbnail} width={100} height={100}/>
            </div>
            <div>
                <h1>{course?.courseName}</h1>
                <h1>{course?.courseDescription.substr(0, 30)}...</h1>
            </div>
        </div>

        <div>
            <p>COURSE DURAITON</p>
        </div>

        <div>
            <div>
                <p>Progress COURSE_PERCENTAGE %</p>
                <ProgressBar
                    completed={30}  
                    height='8px'
                    isLabelVisible={false}
                />

            </div>
        </div>

    </div>
  )
}

export default EnrolledCourseCard