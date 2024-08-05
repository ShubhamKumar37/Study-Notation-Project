import React, { useState } from 'react'
import { HomePageExplore } from "../../../../data/homepage-explore"
import ExploreSingleCard from './ExploreSingleCard';

const ExploreCard = ({ courses, setSelectCourse, selectCourse }) => {

  

  const changeActive = (index) => {
    setSelectCourse(index);
  }

  console.log("This is index of selected course ", selectCourse);
  return (
    <div className='flex flex-col lg:flex-row gap-[4rem] w-[95%] mx-auto'>
      {
        courses.map((item, index) => {
          return (
            <div onClick={() => changeActive(index)} className='lg:w-[34%] mx-auto'>
              <ExploreSingleCard key={index} active={index === selectCourse ? true : false} course={item} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ExploreCard
