
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'
import { CiShoppingCart } from 'react-icons/ci';
import { useDispatch } from 'react-redux';

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return route === location.pathname;
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-700 text-yellow-50" : "bg-opacity-0 text-richblack-300"}`}
    >
      <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`} />

      <div className="flex items-center">
        {Icon ? <Icon className="mr-2" /> : <CiShoppingCart className="mr-2">?</CiShoppingCart>}
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLink
