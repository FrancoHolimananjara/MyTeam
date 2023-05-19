import React, { useState } from "react";
import "./login.css";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");

  const onSubmit = async () => {
    const data = {
      identifier,
      password,
    };
    const response = await axios.post(
      "http://localhost:3001/api/auth/login",
      data
    );
    setToken(response.data["token"]);
    localStorage.setItem("auth", response.data["token"]);
  };

  return (
    <section className="login section">
      <div className="login-box">
        <h1 className="login-title">My Team</h1>
        <form className="login-form">
          <div className="identifier">
            <label htmlFor="identifier">Identifier</label>
            <input type="text" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" />
          </div>
          <button className="login-signin">Sign In</button>
          <p className="or">OR</p>
          <div className="other-methode">
            <button className="login-google">Google</button>
            <button className="login-github">Github</button>
          </div>
          <p className="create-account">
            Don't have account? click{" "}
            <b>
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
