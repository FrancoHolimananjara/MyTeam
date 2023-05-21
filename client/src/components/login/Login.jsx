import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import FloatingLabel from "../../ui-kit/floating-label/FloatingLabel";
import Button from "../../ui-kit/button/Button";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitSignIn = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/auth/login", { identifier, password })
      .then((response) => {
        const { data } = response;
        console.log("TOKEN => ", data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="login section">
      <div className="login-box">
        <h1 className="login-title">
          My <i>Team</i>
        </h1>
        <form className="login-form">
          <FloatingLabel
            name="Identifier"
            type="text"
            setState={setIdentifier}
          />
          <FloatingLabel
            name="Password"
            type="password"
            setState={setPassword}
          />
          <div className="action-submit">
            <Button
              name="Sign In"
              type="primary"
              handleSubmit={handleSubmitSignIn}
            />
            <div className="choice">
              <p className="or">OR</p>
            </div>
            <div className="other-methode">
              <Button name="Google" type="google" icon="bx bxl-google" />
              <Button name="Github" type="secondary" icon="bx bxl-github" />
            </div>
          </div>
          <p className="create-account">
            Don't have account? click{" "}
            <b className="here">
              <u>here</u>
            </b>{" "}
            to create one
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
