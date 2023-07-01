import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import FloatingLabel from "../../ui-kit/floating-label/FloatingLabel";
import Button from "../../ui-kit/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Divider from "../../ui-kit/divider/Divider";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitSignIn = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/auth/login", { identifier, password })
      .then((response) => {
        const { token } = response.data;
        console.log("USER CONNECTED!");
        localStorage.setItem("access-token", token);
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
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
              value="Sign In"
              type="secondary"
              handleSubmit={handleSubmitSignIn}
            />
            <Divider />
            <div className="other-methode">
              <Button value="Google" type="google" icon="bx bxl-google" />
              <Button value="Github" type="secondary" icon="bx bxl-github" />
            </div>
          </div>
          <p className="create-account">
            Don't have account? click{" "}
            <NavLink to={"/register"}>
              <u>here</u>
            </NavLink>{" "}
            to create one
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
