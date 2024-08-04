import React, { useState } from 'react'
import { HomePageExplore } from "../../../../data/homepage-explore"
import ExploreSingleCard from './ExploreSingleCard';

const ExploreCard = ({ courses }) => {

  const [selectCourse, setSelectCourse] = useState(0);

  const changeActive = (index) => {
    setSelectCourse(index);
  }

  console.log("This is index of selected course ", selectCourse);
  return (
    <div className='flex flex-row gap-[4rem] w-[95%]'>
      {
        courses.map((item, index) => {
          return (
            <div onClick={() => changeActive(index)}>
              <ExploreSingleCard key={index} active={index === selectCourse ? true : false} course={item} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ExploreCard
