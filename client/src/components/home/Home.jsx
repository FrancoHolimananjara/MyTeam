import React from "react";
import "./home.css";
import Button from "../../ui-kit/button/Button";
import welcome from "../../assets/welcome-illustration.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="home">
        <div class="content-text">
          <h1>
            welome to <span>my team</span>
          </h1>
          <p class="designed">Designed by Franco</p>
          <p>
            MyTeam is a platform designed for people who
            {" "}
            <i>
              <b>Work</b>
            </i>{" "}
            in a team, for project managment for example.
          </p>
          <Button value="Start now" type="secondary" handleSubmit={() => {
            navigate('/login')
          }} />
        </div>
        <div className="illustration" style={{ background: `url(${welcome}) center/cover` }}>
        </div>
      </div>
    </div>
  );
}

export default Home;
