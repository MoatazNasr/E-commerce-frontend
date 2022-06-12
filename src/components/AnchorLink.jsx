import React from 'react'
import { NavLink } from 'react-router-dom'

const AnchorLink = ({passedClassName , linkTo , children}) => {
  const link = `${linkTo}`
  return (
    <>
        <NavLink to={link} className={passedClassName}>
        {children}
        </NavLink>
    </>
  )
}

export default AnchorLink