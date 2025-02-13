import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import Header from "../../components/Header.jsx";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../css/LoginRegister.css';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({
        full_name: '',
        username: '',
        email: '',
        contact_no: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    // Error state for individual fields
    const [errorMessages, setErrorMessages] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: '',
        general: ''
    });

    const navigate = useNavigate();  // Initialize navigate

    // Handle form input changes
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    // Reset error messages after 2 seconds
    const resetErrorMessages = () => {
        setTimeout(() => {
            setErrorMessages({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                terms: '',
                general: ''
            });
        }, 3000);
    };

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", loginData);
            console.log("Login successful:", response.data);

            // Save user data to localStorage
            const { userId, token, role } = response.data; // Assuming response contains userId, token, and role
            localStorage.setItem('userId', userId);  // Save userId to localStorage
            localStorage.setItem('token', token);    // Save token to localStorage
            localStorage.setItem('role', role);      // Save role to localStorage

            setErrorMessages((prev) => ({ ...prev, general: '' }));

            // Navigate based on role
            if (role === 'Admin') {
                navigate('/admin/dashboard');  // Redirect to admin page
            } else if (role === 'User') {
                navigate('/');  // Redirect to homepage
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessages((prev) => ({ ...prev, general: "*Invalid credentials*" }));
            resetErrorMessages(); // Reset after 2 seconds
        }
    };

    // Handle register form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        let errors = { username: '', email: '', password: '', confirmPassword: '', terms: '' };
        let formIsValid = true;

        // Check if all required fields are filled
        for (const field in registerData) {
            if (!registerData[field] && field !== 'termsAccepted') {
                errors.general = "All fields are required!";
                formIsValid = false;
                break;
            }
        }

        // Password validation
        if (registerData.password.length < 8) {
            errors.general = "*Password must have at least 8 characters!*";
            formIsValid = false;
        }

        // Check password match
        if (registerData.password !== registerData.confirmPassword) {
            errors.confirmPassword = "*Passwords do not match!*";
            formIsValid = false;
        }

        // Check if username or email already exists
        try {
            const response = await axios.post("http://localhost:3000/api/auth/check-username-email", {
                username: registerData.username,
                email: registerData.email
            });

            if (response.data.usernameExists) {
                errors.username = "*Username already exists!*";
                formIsValid = false;
            }
            if (response.data.emailExists) {
                errors.email = "*Email already exists!*";
                formIsValid = false;
            }
        } catch (error) {
            console.error("Error checking username/email:", error);
        }

        // **Terms & Conditions validation (frontend-only check)**
        if (!registerData.termsAccepted) {
            errors.terms = "*You must accept the Terms and Conditions*";
            formIsValid = false;
        }

        // If there are errors, display them and stop submission
        if (!formIsValid) {
            setErrorMessages(errors);
            resetErrorMessages(); // Reset errors after 3 seconds
            return;
        }

        // Prepare request data **without termsAccepted**
        const { termsAccepted, ...registerPayload } = registerData;

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", registerPayload);
            console.log("Registration successful:", response.data);
            // alert("Successfully registered!");
            setAction('');  // Switch to login form
        } catch (error) {
        console.error("Registration error:", error.response ? error.response.data : error);

        if (error.response && error.response.status === 400) {
            setErrorMessages((prev) => ({
                ...prev,
                username: "*Username already exists!*"
            }));
            resetErrorMessages();
        }}
    };
    
    // Handle active form toggling (login/register)
    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="image-container">
                    <img src="/src/assets/images/login_bg.png" alt="Side Image" />
                </div>
                <div className="login_register_container">
                    <div className={`wrapper${action}`}>
                        {/* Login Form */}
                        <div className="form-box login">
                            <form onSubmit={handleLoginSubmit}>
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name="username"
                                        value={loginData.username}
                                        onChange={handleLoginChange}
                                        placeholder="Username"
                                        required
                                    />
                                    <FaUser className="icon" />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        placeholder="Password"
                                        required
                                    />
                                    <FaLock className="icon" />
                                </div>
                                {errorMessages.general && <div className="error-message">{errorMessages.general}</div>}
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

                        {/* Register Form */}
                        <div className="form-box register">
                            <form onSubmit={handleRegisterSubmit}>
                                <h1>Registration</h1>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={registerData.full_name}
                                        onChange={handleRegisterChange}
                                        placeholder="Full Name"
                                        required
                                    />
                                    <FaUser className="icon" />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name="username"
                                        value={registerData.username}
                                        onChange={handleRegisterChange}
                                        placeholder="Username"
                                        required
                                    />
                                    <FaUser className="icon" />
                                    {errorMessages.username && <div className="error-message">{errorMessages.username}</div>}
                                </div>
                                <div className="input-box">
                                    <input
                                        type="email"
                                        name="email"
                                        value={registerData.email}
                                        onChange={handleRegisterChange}
                                        placeholder="Email"
                                        required
                                    />
                                    <FaEnvelope className="icon" />
                                    {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
                                </div>
                                <div className="input-box">
                                    <input
                                        type="number"
                                        name="contact_no"
                                        value={registerData.contact_no}
                                        onChange={handleRegisterChange}
                                        placeholder="Phone Number"
                                        required
                                    />
                                    <FaPhoneAlt className="icon" />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        placeholder="Password"
                                        required
                                    />
                                    <FaLock className="icon" />
                                    {errorMessages.password && <div className="error-message">{errorMessages.password}</div>}
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={registerData.confirmPassword}
                                        onChange={handleRegisterChange}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <FaLock className="icon" />
                                    {errorMessages.confirmPassword && <div className="error-message">{errorMessages.confirmPassword}</div>}
                                </div>
                                {errorMessages.general && <div className="error-message">{errorMessages.general}</div>}
                                <div className="remember-forgot">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={registerData.termsAccepted}
                                            onChange={(e) => setRegisterData((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                                        />
                                        Terms & Conditions
                                    </label>
                                    {errorMessages.terms && <div className="error-message">{errorMessages.terms}</div>}
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
