import React from 'react';

function Data() {
    return (
        <div className="home__data">
            <h1 className="home__title">
                Welcome to <b className="myteam">MyTeam</b>
            </h1>
            <h3 className="home__subtitle">Designed by <b>Franco</b></h3>
            <p className="home__description">
                MyTeam is a platform designed for people who <b>Work</b> in a team, for project managment for example.
            </p>

            <a href="#contact" className="button button--flex">
                Sart now <i className="bx bx-send button__icon"></i>
            </a>
        </div>
    );
}

export default Data;
