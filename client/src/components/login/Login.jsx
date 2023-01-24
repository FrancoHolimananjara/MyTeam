import React from 'react';
import './login.css';

function Login() {
    return (
        <section className="login section">
            <div className="login__container container grid">
                <div className="login__content">
                    <form action="" className="login__form">
                        <h1>Login form</h1>
                        <div className="input__group">
                            <label htmlFor="">Username</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="input__group">
                            <label htmlFor="">Username</label>
                            <input type="text" name="" id="" />
                        </div>
                        <p className="or">Or</p>
                        <div className="login__social">
                            <a href="/" className="button">
                                <i className="bx bxl-google"></i> Google account
                            </a>
                            <a href="/" className="button">
                                <i className="bx bxl-github"></i> GitHub account
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
