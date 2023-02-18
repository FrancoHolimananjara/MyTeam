import React, { useState } from 'react';
import axios from 'axios';

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async () => {
        const data = {
            username,
            email,
            password
        }
        console.log(password, confirmPassword);
        if (checkPassword(password,confirmPassword)) {
            const response = await axios.post("http://localhost:3001/api/auth/register", data);
        } else {
            console.log("Invalid credential")
        }
    }
    const checkPassword = async (p, cp) => {
        return cp === p ? true : false;
    }
    return (
        <section className="login section">
            <div className="login__container grid">
                <div className="login__content">
                    <form action="" className="login__form">
                        <h1>Register form</h1>
                        <div className="input__group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="usename" id="username"
                                required minLength={4}
                                onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="input__group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="usename" id="email"
                                required pattern='/^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$/'
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="input__group">
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <i onClick={(e) => { setShowPassword(!showPassword);console.log(showPassword) }} className="bx bx-dizzy password__icon"></i>
                            </div>
                            <input type={showPassword ? 'text' : 'password'} name="" id="password" onChange={(e) => { setPassword(e.target.value) }}/>
                        </div>
                        <div className="input__group">
                            <div className="password">
                                <label htmlFor="confirm">Confirm your password</label>
                            </div>
                            <input type="password" name="" id="confirm" onChange={(e) => { setConfirmPassword(e.target.value) }}/>
                        </div>
                        <button type='button' className='button button__flex' onClick={()=>onSubmit()}>
                            Register
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
    )
}
export default Register;