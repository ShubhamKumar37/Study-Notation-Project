import React from 'react';

// Reusable Card Component
const MissionCard = ({ title, description, bgColor }) => {
    return (
        <div className={`p-6 rounded-lg shadow-lg text-white ${bgColor} h-[10rem] lg:h-[15rem]`}>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
};

const LearningSection = () => {
    // Data for the cards
    const cardData = [
        {
            title: 'Curriculum Based on Industry Needs',
            description: 'Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.',
            bgColor: 'bg-richblack-400'
        },
        {
            title: 'Our Learning Methods',
            description: 'The learning process uses the namely online and offline.',
            bgColor: 'bg-richblack-700'
        },
        {
            title: 'Certification',
            description: 'You will get a certificate that can be used as a certification during job hunting.',
            bgColor: 'bg-richblack-400'
        },
        {
            title: 'Rating "Auto-grading"',
            description: 'You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.',
            bgColor: 'bg-richblack-700'
        },
        {
            title: 'Ready to Work',
            description: 'Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.',
            bgColor: 'bg-richblack-400'
        },
    ];

    return (
        <div className="w-11/12 mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* First row - 50% width for World-Class Learning section */}
                <div className="col-span-1 md:col-span-2 bg-gray-900 p-8 rounded-lg">
                    <h2 className="text-white text-4xl font-bold mb-4">World-Class Learning for <span className="text-blue-400">Anyone, Anywhere</span></h2>
                    <p className="text-white mb-6">
                        Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                    </p>
                    <button className="text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95">
                        Learn More
                    </button>
                </div>

                {/* First row - 25% width cards */}
                {cardData.slice(0, 2).map((card, index) => (
                    <div className="col-span-1" key={index}>
                        <MissionCard title={card.title} description={card.description} bgColor={card.bgColor} />
                    </div>
                ))}

                {/* Second row - Empty space + 25% width cards */}
                <div className="col-span-1 hidden md:block"></div> {/* Hide empty space on small screens */}
                {cardData.slice(2).map((card, index) => (
                    <div className="col-span-1" key={index + 2}>
                        <MissionCard title={card.title} description={card.description} bgColor={card.bgColor} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearningSection;
