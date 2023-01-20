import React from 'react';
import './home.css';
import Data from './Data';
import ScrollDown from './ScrollDown';

function Home() {
    return (
        <section className="home section" id="home">
            <div className="home__container container grid">
                <div className="home__content grid">
                    {/* SOCIAL */}
                    <div className="home__img"></div>
                    {/* DATA */}
                    <Data />
                </div>
                <ScrollDown />
            </div>
        </section>
    );
}

export default Home;
