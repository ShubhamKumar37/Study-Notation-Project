import React from 'react'
import ExploreSingleCard from './ExploreSingleCard';

const ExploreCard = ({ courses, setSelectCourse, selectCourse }) => {

  const changeActive = (index) => {
    setSelectCourse(index);
  }

  return (
    <div className='flex flex-col lg:flex-row gap-[4rem] w-[95%] mx-auto'>
      {
        courses.map((item, index) => {
          return (
            <div key={index} onClick={() => changeActive(index)} className='lg:w-[34%] mx-auto'>
              <ExploreSingleCard active={index === selectCourse ? true : false} course={item} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ExploreCard
