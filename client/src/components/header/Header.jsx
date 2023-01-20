import React , { useState } from 'react';
import './header.css';

function Header() {
    // STATE (état, données)

    /* TOGGLE MENU */
    const [toggle, setToggle] = useState(false);

    // BEHAVIOR (comportements)
    // RENDER (affichage)
    return (
        <header className='header'>
            <nav className="nav container">
                <a href="index.html" className="nav__logo">
                    My team
                </a>
                <div className={toggle? "nav__menu show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">
                                <i className="bx bx-home nav__icon"></i> Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link">
                                <i className="bx bx-briefcase-alt nav__icon"></i> Services
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link">
                                <i className="bx bx-info-circle nav__icon"></i> About
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link">
                                <i className="bx bx-send nav__icon"></i> Contact
                            </a>
                        </li>
                    </ul>

                    <i className="bx bx-x nav__close" onClick={() => setToggle(!toggle)}></i>
                </div>

                <div className="nav__toggle" onClick={() => setToggle(!toggle)}>
                    <i class='bx bxs-dashboard'></i>
                </div>
            </nav>
        </header>
    );
}

export default Header;
