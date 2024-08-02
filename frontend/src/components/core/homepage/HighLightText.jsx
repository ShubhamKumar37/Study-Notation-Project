import React from 'react'
import "../../../pages/allPageCSS.css"

const HighLightText = ({ text , cssNum}) => {
  return (
    <span className={`font-bold ${cssNum === 1 ? "text1-gradient" : "text2-gradient"}`}>
      {"  "}
      {text}
      {"  "}
    </span>
  )
}

export default HighLightText
