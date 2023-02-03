import React , { useState } from 'react';
import './login.css';

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="login section">
            <div className="login__container grid">
                <div className="login__content">
                    <form action="" className="login__form">
                        <h1>Login form</h1>
                        <div className="input__group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="usename" id="username" />
                        </div>
                        <div className="input__group">
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <i className="bx bx-dizzy password__icon"></i>
                            </div>
                            <input type="password" name="" id="password" />
                        </div>
                        <button className='button button__flex'>
                            Sign In
                        </button>
                        <p className="or">Or</p>
                        <div className="login__social">
                            <a href="/" className="button">
                                <i className="bx bxl-google"></i> <u>Google</u>account
                            </a>
                            <a href="/" className="button">
                                <i className="bx bxl-github"></i> <u>GitHub</u> account
                            </a>
                        </div>
                    </form>
                </div>
                <div className='login__img'></div>
            </div>
        </section>
    );
}

export default Login;
