import React from "react";
import "../register/register.css";
import FloatingLabel from "../../ui-kit/floating-label/FloatingLabel";
import Button from "../../ui-kit/button/Button";

function Register() {
  const checkPassword = async (p, cp) => {
    return cp === p ? true : false;
  };
  return (
    <section className="register section">
      <div className="register-box">
        <h1 className="register-title">
          My <i>Team</i>
        </h1>
        <form className="register-form">
          <FloatingLabel name="Username" type="text" />
          <FloatingLabel name="Email" type="email" />
          <div className="password-action">
            <FloatingLabel name="Password" type="password" />
            <FloatingLabel name="Confirm" type="password" />
          </div>
          <div className="action-submit">
            <Button name="Register" type="secondary" />
            <div className="choice">
              <p className="or">OR</p>
            </div>
            <div className="other-methode">
              <Button name="Google" type="google" icon="bx bxl-google" />
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
