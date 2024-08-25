import React from 'react'
import InfoBelt from './InfoBelt'
import Button from '../../homepage/Button'
import ColorText from './ColorText'
import MissionCard from './MissionCard'

const Section3 = () => {

    const cardData = [
        { title: "Curriculum Based on Industry Needs", desc: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs." },
        { title: "Our Learning Methods", desc: "The learning process uses the namely online and offline." },
        { title: "Certification", desc: "You will get a certificate that can be used as a certification during job hunting." },
        { title: `Rating \n"Auto-grading"`, desc: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor." },
        { title: "Ready \nto Work", desc: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program." },
    ]

    return (
        <div className='text-white'>
            <InfoBelt />

            <div className='flex flex-row'>
                <div>
                    <div>
                        <h1>World-Class Learning for</h1>
                        <h1><ColorText /></h1>
                    </div>

                    <p>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>

                    <Button active={1} linkTo={"/login"}>Learn More</Button >
                </div>

                <div className='flex flex-row'>
                    {
                        cardData && cardData.map((item, index) => {
                            if (index < 2) {
                                return <MissionCard key={index} obj={item} className={""} />;
                            }
                            return null;
                        })
                    }
                </div>
            </div>
            <div className='flex flex-row-reverse'>
                {
                    cardData && cardData.map((item, index) => {
                        if (index > 1) {
                            return <MissionCard key={index} obj={item} className={""} />;
                        }
                        return null;
                    })

                }
            </div>
        </div>
    )
}

export default Section3
