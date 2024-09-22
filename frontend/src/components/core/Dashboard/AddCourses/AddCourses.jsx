import React from 'react'
import RenderSteps from './RenderSteps'


const stepData = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important",
    "Notes to all enrolled students at once.",
];


const AddCourses = () => {



    return (
    <div className='flex flex-row justify-between p-3   '>
        <div className='w-[60%]'>
            <p>Add Course</p>
            <div className=''>
                <RenderSteps />
            </div>
        </div>

        <div className="bg-richblack-800 p-6 rounded-md shadow-lg w-[30%] h-fit">
            <h1>Course upload list</h1>
            <ul className='w-fit'>
                {
                    stepData.map((item, index) =>
                    {
                        return <li key={index} className="px-4 py-2 text-sm  border-b border-richblack-500 last:border-b-0">{item}</li>
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default AddCourses
