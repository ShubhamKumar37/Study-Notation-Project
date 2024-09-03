import React from 'react';
import ContactForm from '../components/core/About/ContactForm';
import FooterSection from '../components/core/Footer/FooterSection';

const contactDetails = [
    {
        title: "Chat on us",
        description: "Our friendly team is here to help.",
        additionalInfo: "@mail address",
        icon: "💬",
    },
    {
        title: "Visit us",
        description: "Come and say hello at our office HQ.",
        additionalInfo: "Here is the location/address",
        icon: "📍",
    },
    {
        title: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        additionalInfo: "+123 456 7890",
        icon: "📞",
    },
];

const ContactUs = () => {
    return (
        <div>

            <div className="min-h-screen flex flex-col items-center mt-[5rem] justify-center text-white p-8">
                <div className="w-full max-w-6xl flex flex-col  md:flex-row gap-[3rem]">
                    {/* Left Section */}
                    <div className="bg-richblack-700 p-8 rounded-lg w-[40%] h-fit ">
                        <div className="space-y-6">
                            {contactDetails.map((detail, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="bg-gray-700 p-4 rounded-full">
                                        {/* Replace with an appropriate icon */}
                                        <span role="img" aria-label={detail.title}>
                                            {detail.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{detail.title}</h3>
                                        <p className="text-gray-400">{detail.description}</p>
                                        <p className="text-gray-400">{detail.additionalInfo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="border-richblack-50 border p-12 rounded-lg">
                        {/* Space for the form */}
                        <h2 className="text-3xl font-bold mb-4">
                            Got an Idea? We've got the skills. Let's team up
                        </h2>
                        <p className="text-lg mb-6">
                            Tell us more about yourself and what you've got in mind.
                        </p>

                        <ContactForm />

                    </div>
                </div>

            </div>
                <FooterSection />
        </div>
    );
};

export default ContactUs;