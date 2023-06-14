import React from "react";
import "./header.css";
import { Link } from 'react-router-dom';


const links = [
  {
    id: 0,
    name: 'Home',
    url:'/'
  },
  {
    id: 1,
    name: 'Services',
    url:'/services'
  },
  {
    id: 2,
    name: 'About',
    url:'/about'
  },
  {
    id: 3,
    name: 'Contact',
    url:'/contact'
  },
]

function Header() {
  // STATE (état, données)
  // BEHAVIOR (comportements)
  // RENDER (affichage)
  return (
    <div className="container">
      <nav className="header">
        <Link to="/" className="logo">My team</Link>
        <ul className="links">
          {links.map(link => {
            return <li className="link" key={link.id}>
              <Link to={link.url} className="link-item">{link.name}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
