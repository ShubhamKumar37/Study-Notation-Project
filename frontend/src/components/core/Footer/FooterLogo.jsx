import React from 'react'
import { Link } from 'react-router-dom'

const FooterLogo = ({data, color}) => {
  return (
    <div className={`text-[${color}] flex flex-row`}>
        {
            data.map((item, index) =>
            {
                return (<Link key={index} to={item.link}><item.icon /></Link>)
            })
        }
    </div>
  )
}

export default FooterLogo
