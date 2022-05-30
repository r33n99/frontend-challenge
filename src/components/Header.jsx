import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header">
        <NavLink className='header__link' activeClassName={"active"} to="/">Все котики</NavLink>
        <NavLink className='header__link' activeClassName={"active"} to="/favorites">Любимые котики</NavLink>
    </div>
  )
}
