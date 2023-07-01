import React, { useState } from "react";
import "./header.css";
import { Link, NavLink } from 'react-router-dom';


const links = [
  {
    id: 0,
    name: 'Home',
    url: '/'
  },
  {
    id: 1,
    name: 'Services',
    url: '/services'
  },
  {
    id: 2,
    name: 'About',
    url: '/about'
  },
  {
    id: 3,
    name: 'Contact',
    url: '/contact'
  },
  {
    id: 4,
    name: 'Login',
    url: '/login'
  },
  {
    id: 5,
    name: 'Register',
    url: '/register'
  },
]

function Header() {
  // STATE (état, données)
  const [isOpen, setIsOpen] = useState(false);
  // BEHAVIOR (comportements)
  const navLinkActivestyles = ({ isActive }) => {
    return {
      color: isActive ? 'white' : 'rgb(158, 158, 158)',
      fontWeight: isActive ? '400' : 'normal',
      borderBottom: isActive ? '2px solid #646cff' : 'none',
    }
  }
  // RENDER (affichage)
  return (
    <div className="container">
      <nav className="header">
        <Link to="/" className="logo">My team</Link>
        {console.log(isOpen)}
        <ul className={isOpen ? 'links open' : 'links'}>
          {links.map(({ id, name, url }) => {
            return <li className="link" key={id}>
              <NavLink to={url} style={navLinkActivestyles} className="link-item">{name}</NavLink>
            </li>
          })}
        </ul>
        <div className="menu" onClick={() => {
          setIsOpen(!isOpen)
        }}>
          <i class={isOpen ? 'bx bx-menu-alt-left' : 'bx bx-menu-alt-right'} ></i>
          <span>{isOpen ? 'x' : 'o'}</span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
