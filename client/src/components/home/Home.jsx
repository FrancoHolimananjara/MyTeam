import React from "react";
import "./home.css";
import Button from "../../ui-kit/button/Button";
import fond_curvy from "../../assets/fond-curvy.svg";
import welcome from "../../assets/welcome-illustration.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (<>
    <section className="accueil">
      <div class="contenu">
        <h1>
          welome to my <i>team</i>
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
        <img
          src={welcome}
          alt="welcome"
          class="welcome"
        />
        <div className="other-class">
          <Button
            otherclass="other-class"
            name="Start now"
            type="secondary"
            handleSubmit={()=>{
              navigate('/login')
            }}
          ></Button>
        </div>
      </div>
      <img
        src={fond_curvy}
        alt="fond-curvy"
        class="fond-curvy"
      />
    </section>
  </>
  );
}

export default Home;
