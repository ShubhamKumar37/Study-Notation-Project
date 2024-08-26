import React from 'react'
import Section1 from '../components/core/Auth/About/Section1'
import Quote from '../components/core/Auth/About/Quote'
import Section2 from '../components/core/Auth/About/Section2'
import Section3 from '../components/core/Auth/About/Section3'
import FooterSection from '../components/core/Footer/FooterSection'
import ContactForm from '../components/core/Auth/About/ContactForm'

const About = () => {
  return (
    <div className=''>
        {/* Section 1 */}
        <div className='relative pt-[4rem] bg-[#161D29]'> 
          <Section1 />
        </div>

        <Quote />

        <Section2 />

        <Section3 />

        {/* Form here  */}

        <div>
          <h1>Get in Touch</h1>
          <p>We’d love to here for you, Please fill out this form.</p>

          <ContactForm />
        </div>


        <FooterSection />
    </div>
  )
}

export default About