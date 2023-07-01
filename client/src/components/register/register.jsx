import React, { useState } from "react";
import "./register.css";
import FloatingLabel from "../../ui-kit/floating-label/FloatingLabel";
import Button from "../../ui-kit/button/Button";
import axios from "axios";

import { Link } from "react-router-dom";
import Divider from "../../ui-kit/divider/Divider";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkPassword(password, confirm)) {
      console.log(checkPassword(password, confirm));
      axios
        .post("http://localhost:3001/api/auth/register", {
          username,
          email,
          password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("PASSWORD DOESN'T MATCH");
    }
  };

  const checkPassword = (p, cp) => {
    return cp === p ? true : false;
  };
  return (
    <div className="container">
      <div className="register-box">
        <h1 className="register-title">
          Register
        </h1>
        <form className="register-form">
          <FloatingLabel name="Username" type="text" setState={setUsername} />
          <FloatingLabel name="Email" type="email" setState={setEmail} />
          <FloatingLabel
            name="Password"
            type="password"
            setState={setPassword}
          />
          <FloatingLabel name="Confirm" type="password" setState={setConfirm} />
          <div className="action-submit">
            <Button
              value="Register"
              type="primary"
              handleSubmit={handleSubmit}
            />
            <Divider />
            <div className="other-methode">
              <Button type="google" icon="bx bxl-google" value="Google" />
              <Button type="primary" icon="bx bxl-github" value="Github" />
            </div>
          </div>
          <p className="here-to-login">
            Do you have an account? click {" "} <Link to={"/login"}><u>here</u></Link> {" "}to
            login
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
