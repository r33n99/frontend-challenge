import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header">
        <Link to="/">Все котики</Link>
        <Link to="/favorites">Любимые котики</Link>
    </div>
  )
}
