import React from 'react'
import Section1 from '../components/core/Auth/About/Section1'
import Quote from '../components/core/Auth/About/Quote'

const About = () => {
  return (
    <div className=''>
        {/* Section 1 */}
        <div className='relative pt-[4rem] bg-[#161D29]'> 
          <Section1 />
        </div>

        <Quote />
    </div>
  )
}

export default About