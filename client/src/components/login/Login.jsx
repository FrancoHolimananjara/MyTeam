import React , { useState } from 'react';
import './login.css';
import axios from 'axios';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState("");

    const onSubmit = async () => {
        const data = {
            identifier,
            password
        }
        const response = await axios.post("http://localhost:3001/api/auth/login", data);
        setToken(response.data['token']);
        localStorage.setItem('auth', response.data['token']);
    }

    return (
        <section className="login section">
            <div className="login__container grid">
                <div className="login__content">
                    <form action="" className="login__form">
                        <h1>Login form</h1>
                        <div className="input__group">
                            <label htmlFor="identifier">Identifier</label>
                            <input type="text" name="usename" id="identifier" onChange={(e)=>{setIdentifier(e.target.value)}} />
                        </div>
                        <div className="input__group">
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <i onClick={(e) => { setShowPassword(!showPassword);console.log(showPassword) }} className="bx bx-dizzy password__icon"></i>
                            </div>
                            <input type={showPassword ? 'text' : 'password'} name="" id="password" onChange={(e) => { setPassword(e.target.value) }}/>
                        </div>
                        <button type='button' className='button button__flex' onClick={()=>onSubmit()}>
                            Sign In
                        </button>
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
                <div className='login__img'></div>
            </div>
        </section>
    );
}

export default Login;
