import React from 'react';
import FooterList from './FooterList';
import { FooterLink2 } from '../../../../data/footer-links';

const FooterSection = () => {
    return (
        <div className='bg-[#161D29]'>
            <div className='p-10'>
                <div>
                    {/* Footer left */}


                    {/* Footer right */}
                    <div>
                        {
                            FooterLink2.map((item, index) => 
                            {
                                return (<div key={index}> <FooterList data={item}/> </div>)
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
