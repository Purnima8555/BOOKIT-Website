import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Header from "../components/Header.jsx";
import './css/LoginRegister.css';

const LoginRegister = () => {
    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <>
            <Header />  {/* Add Header component here */}
            <div className="main-container">
                <div className="image-container">
                    <img src="/src/assets/images/login_bg.png" alt="Side Image" />
                </div>
                <div className="login_register_container">
                    <div className={`wrapper${action}`}>
                        <div className="form-box login">
                            <form action="">
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input type="text" placeholder="Username" required />
                                    <FaUser className="icon" />
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="Password" required />
                                    <FaLock className="icon" />
                                </div>
                                <div className="remember-forgot">
                                    <label>
                                        <input type="checkbox" />
                                        Remember me
                                    </label>
                                    <a href="/forgot-password">Forgot password?</a>
                                </div>
                                <button type="submit">Login</button>
                                <div className="register-link">
                                    <p>Don't have an account? <a href="#" onClick={registerLink}>SignUp</a></p>
                                </div>
                            </form>
                        </div>

                        <div className="form-box register">
                            <form action="">
                                <h1>Registration</h1>
                                <div className="input-box">
                                    <input type="text" placeholder="Full Name" required />
                                    <FaUser className="icon" />
                                </div>
                                <div className="input-box">
                                    <input type="text" placeholder="Username" required />
                                    <FaUser className="icon" />
                                </div>
                                <div className="input-box">
                                    <input type="email" placeholder="Email" required />
                                    <FaEnvelope className="icon" />
                                </div>
                                <div className="input-box">
                                    <input type="number" placeholder="Phone Number" required />
                                    <FaPhoneAlt className="icon" />
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="Password" required />
                                    <FaLock className="icon" />
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="Confirm Password" required />
                                    <FaLock className="icon" />
                                </div>
                                <div className="remember-forgot">
                                    <label>
                                        <input type="checkbox" />
                                        Terms & Conditions
                                    </label>
                                </div>
                                <button type="submit">Register</button>
                                <div className="register-link">
                                    <p>Already have an account? <a href="#" onClick={loginLink}>SignIn</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginRegister;
