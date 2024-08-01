import React from 'react';
import FooterList from './FooterList';
import { FooterLink2, FooterLink1, FooterLogoArray } from "../../../data/footer-links";
import Logo from "../../../assets/Logo/Logo-Full-Light.png"

import { FaFacebook, FaYoutube, FaGoogle, FaTwitter } from "react-icons/fa";
import FooterLogo from './FooterLogo';

const FooterSection = () => {
    return (
        <div className='bg-[#161D29]'>
            <div className='p-10'>
                <div className='flex flex-row justify-between'>
                    {/* Footer left */}
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <img src={Logo}></img>
                            
                            <FooterList data={FooterLink1[0]} />

                            <FooterLogo data={FooterLogoArray} color={"#6E727F"} />
                        </div>

                        <div className='flex flex-col'>
                            <FooterList data={FooterLink1[1]}/>
                            <FooterList data={FooterLink1[2]}/>
                        </div>

                        <div className='flex flex-col'>
                            <FooterList data={FooterLink1[3]}/>
                            <FooterList data={FooterLink1[4]}/>
                        </div>
                    </div>


                    <div className='flex flex-col h-full rotate-90 '>
                        <hr className='w-2 h-full text-[#405271]'></hr>

                    </div>

                    {/* Footer right */}
                    <div className='flex flex-row justify-evenly'>
                        {
                            FooterLink2.map((item, index) => 
                            {
                                return (<div key={index} className=''> <FooterList data={item}/> </div>)
                            })
                        }

                    </div>
                </div>

                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default FooterSection
