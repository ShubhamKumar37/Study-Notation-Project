import React from 'react'
import Section1 from '../components/core/About/Section1'
import Quote from '../components/core/About/Quote'
import Section2 from '../components/core/About/Section2'
import Section3 from '../components/core/About/Section3'
import FooterSection from '../components/core/Footer/FooterSection'
import ContactForm from '../components/core/About/ContactForm'

const About = () => {
  return (
    <div className=''>
        {/* Section 1 */}
        <div className='relative pt-[4rem] bg-[#161D29]'> 
          <Section1 />
        </div>

        <div className= 'border-b border-richblack-400 my-[2rem]'>
          <Quote />
        </div>

        <div className='w-9/12 mx-auto mt-[10rem]'>
          <Section2 />

        </div>


        {/* <Section3 /> */}

        {/* Form here  */}

        <div className='w-11/12 text-white my-[5rem] flex flex-col gap-5  mx-auto p-5'>
          <h1 className='text-center font-bold text-2xl'>Get in Touch</h1>
          <p className='text-center text-sm text-richblack-100'>We’d love to here for you, Please fill out this form.</p>

          <ContactForm />
        </div>


        <FooterSection />
    </div>
  )
}

export default About