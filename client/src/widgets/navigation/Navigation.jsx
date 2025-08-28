import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navigation.css';

export default function Navigation() {
  return (
    <>
    <nav className='header'>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `header__link ${isActive && 'header__link--active'}`
        }
      >
        ЧЛЕН1
      </NavLink>
      <NavLink
        to='/Decks'
        className={({ isActive }) =>
          `header__link ${isActive && 'header__link--active'}`
        }
      >
        ЧЛЕН2
      </NavLink>      
    </nav>
    </>
  );
}