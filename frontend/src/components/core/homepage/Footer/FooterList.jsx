import React from 'react'
import { Link } from 'react-router-dom'
import FooterText from './FooterText'

const FooterList = ({data}) => {
  return (
    <ul>
        <li className='text-[#AFB2BF]'>{data.title}</li>
        {
            data.links.map((item, index) =>
            {
                return (<li key={index}><Link to={item.link}><FooterText text={item.title} /></Link></li>)
            })
        }
    </ul>
  )
}

export default FooterList
