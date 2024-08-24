import React from 'react'

const ColorText = ({text, color}) => {
  return (
    <span className={`${color}`}>
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default ColorText
