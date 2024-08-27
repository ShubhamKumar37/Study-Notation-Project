import React from 'react'
import HighLightText from '../../homepage/HighLightText'
import Banner1 from "../../../../assets/Images/aboutus1.webp"
import Banner2 from "../../../../assets/Images/aboutus2.webp"
import Banner3 from "../../../../assets/Images/aboutus3.webp"

const Section1 = () => {

  const imageData = [Banner1, Banner2, Banner3];

  return (
    <section className='text-white w-11/12 mx-auto max-h-[22rem] mb-[12%]'>
        <div className='flex flex-col items-center gap-4'> 
            <h1 className='text-center text-3xl font-bold'>
              Driving Innovation in Online Education for a <br/>
            <HighLightText text={"Brighter Future"} cssNum={1}/>
            </h1>

            <p className='text-center text-sm text-richblack-200 w-[80%]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

            <div className='flex flex-row gap-4 p-2'>
              {
                imageData.map((item, index) =>
                {
                  return (<img src={item} key={index} className='object-contain aspect-square w-[33%]' />)
                })
              }
              {/* <img src={Banner1} alt="Banner1" className='object-contain aspect-square'/>
              <img src={Banner2} alt="Banner2" width={350} height={350} className='object-contain aspect-square' />
              <img src={Banner3} alt="Banner3" width={350} height={350} className='object-contain aspect-square' /> */}
            </div>
        </div>
    </section>
  )
}

export default Section1