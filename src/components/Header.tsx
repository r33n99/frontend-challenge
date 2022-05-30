import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header">
        <NavLink className={({isActive}) => "header__link" + (isActive ? " active" : "")}  to="/">Все котики</NavLink>
        <NavLink className={({isActive}) => "header__link" + (isActive ? " active" : "")}  to="/favorites">Любимые котики</NavLink>
    </div>
  )
}
