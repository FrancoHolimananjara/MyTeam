import React, { useState } from "react";
import "../register/register.css";
import FloatingLabel from "../../ui-kit/floating-label/FloatingLabel";
import Button from "../../ui-kit/button/Button";
import axios from "axios";

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
    <section className="register section">
      <div className="register-box">
        <h1 className="register-title">
          My <i>Team</i>
        </h1>
        <form className="register-form">
          <FloatingLabel name="Username" type="text" setState={setUsername} />
          <FloatingLabel name="Email" type="email" setState={setEmail} />
          <div className="password-action">
            <FloatingLabel
              name="Password"
              type="password"
              setState={setPassword}
            />
            <FloatingLabel
              name="Confirm"
              type="password"
              setState={setConfirm}
            />
          </div>
          <div className="action-submit">
            <Button
              name="Register"
              type="secondary"
              handleSubmit={handleSubmit}
            />
            <div className="choice">
              <p className="or">OR</p>
            </div>
            <div className="other-methode">
              <Button name="Google" type="google2" icon="bx bxl-google" />
              <Button name="Github" type="primary" icon="bx bxl-github" />
            </div>
          </div>
          <p className="here-to-login">
            You have already account? click{" "}
            <b className="here">
              <u>here</u>
            </b>{" "}
            to login
          </p>
        </form>
      </div>
    </section>
  );
}
export default Register;
