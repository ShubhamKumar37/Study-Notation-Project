import React from 'react';
import FooterList from './FooterList';
import { FooterLink2, FooterLink1, FooterLogoArray, FooterBottomText } from "../../../data/footer-links";
import Logo from "../../../assets/Logo/Logo-Full-Light.png"
import { FaHeart } from "react-icons/fa";

import FooterLogo from './FooterLogo';
import { Link } from 'react-router-dom';

const FooterSection = () => {
    return (
        <div className='relative bg-[#161D29] py-10 pb-7 text-sm border-t border-[#6E727F]'>
            <div className='w-[95%] mx-auto flex flex-col gap-6'>
                <div className='flex flex-col lg:flex-row justify-between gap-[2rem]'>
                    {/* Footer left */}
                    <div className='flex  lg:flex-row justify-evenly lg:w-[48%] gap-[2rem]'>
                        <div className='flex flex-col gap-[1rem]'>
                            <img src={Logo} alt='StudyNotion Logo'></img>

                            <FooterList data={FooterLink1[0]} />

                            <FooterLogo data={FooterLogoArray} color={"#6E727F"} />
                        </div>
                        <div className='flex flex-col lg:flex-row gap-[2rem] '>

                            <div className='flex flex-col gap-[2rem]'>
                                <FooterList data={FooterLink1[1]} />
                                <FooterList data={FooterLink1[2]} />
                            </div>

                            <div className='flex flex-col gap-[2rem]'>
                                <FooterList data={FooterLink1[3]} />
                                <FooterList data={FooterLink1[4]} />
                            </div>
                        </div>

                    </div>


                    <div className="flex ">
                        <hr className="lg:h-full lg:w-[0.5px] lg:bg-[#405271] lg:border-none" />
                    </div>

                    {/* Footer right */}
                    <div className='flex flex-row justify-evenly lg:w-[48%]'>
                        {
                            FooterLink2.map((item, index) => {
                                return (<div key={index} className='flex flex-row'> <FooterList data={item} /> </div>)
                            })
                        }

                    </div>
                </div>
                    
                <div className='lg:w-[90%] lg:bg-[#405271] lg:mx-auto lg:h-[0.5px]'></div>

                <div className='text-[#6E727F] flex flex-row gap-[1rem] w-full lg:w-[80%] mx-auto justify-between'>
                    <div>
                        {
                            FooterBottomText.map((item, index) =>
                            {
                                return (<Link key={index} to={item.link}>{item.title}</Link>)
                            })
                        }
                    </div>
                    <div className=''>
                        <p>Made with <FaHeart className='inline text-[#ff1c1c]'/> Shubham Kumar © 2024 StudyNotion</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSection
