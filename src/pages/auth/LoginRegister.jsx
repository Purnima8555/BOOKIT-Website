import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import TermsAndConditions from "./Terms&Condition.jsx"; // Updated import
import "../css/LoginRegister.css";

Modal.setAppElement("#root");

const LoginRegister = () => {
  const [action, setAction] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    full_name: "",
    username: "",
    email: "",
    contact_no: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
    general: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset error messages after 3 seconds
  const resetErrorMessages = () => {
    setTimeout(() => {
      setErrorMessages({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: "",
        general: "",
      });
    }, 3000);
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", loginData);
      console.log("Login successful:", response.data);

      const { userId, token, role } = response.data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setErrorMessages((prev) => ({ ...prev, general: "" }));

      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "User") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessages((prev) => ({ ...prev, general: "*Invalid credentials*" }));
      resetErrorMessages();
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let errors = { username: "", email: "", password: "", confirmPassword: "", terms: "", general: "" };
    let formIsValid = true;

    for (const field in registerData) {
      if (!registerData[field] && field !== "termsAccepted") {
        errors.general = "*All fields are required!*";
        formIsValid = false;
        break;
      }
    }

    if (registerData.password.length < 8) {
      errors.password = "*Password must have at least 8 characters!*";
      formIsValid = false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "*Passwords do not match!*";
      formIsValid = false;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/check-user-exists", {
        username: registerData.username,
        email: registerData.email,
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

    if (!registerData.termsAccepted) {
      errors.terms = "*You must accept the Terms and Conditions!*";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrorMessages(errors);
      resetErrorMessages();
      return;
    }

    const { termsAccepted, ...registerPayload } = registerData;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", registerPayload);
      console.log("Registration successful:", response.data);
      setAction("");
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error);
      if (error.response && error.response.status === 400) {
        setErrorMessages((prev) => ({
          ...prev,
          username: "*Username already exists!*",
        }));
        resetErrorMessages();
      }
    }
  };

  // Callback for when user agrees to T&C in the modal
  const handleTermsAgree = (agreed) => {
    if (agreed) {
      setRegisterData((prev) => ({ ...prev, termsAccepted: true }));
      setModalIsOpen(false);
    }
  };

  const registerLink = () => setAction(" active");
  const loginLink = () => setAction("");

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
                {errorMessages.general && (
                  <div className="error-message">{errorMessages.general}</div>
                )}
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="/password-reset">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                  <p>
                    Don’t have an account? <a href="#" onClick={registerLink}>SignUp</a>
                  </p>
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
                  {errorMessages.username && (
                    <div className="error-message">{errorMessages.username}</div>
                  )}
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
                  {errorMessages.email && (
                    <div className="error-message">{errorMessages.email}</div>
                  )}
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
                  {errorMessages.password && (
                    <div className="error-message">{errorMessages.password}</div>
                  )}
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
                  {errorMessages.confirmPassword && (
                    <div className="error-message">{errorMessages.confirmPassword}</div>
                  )}
                </div>
                {errorMessages.general && (
                  <div className="error-message">{errorMessages.general}</div>
                )}
                <div className="remember-forgot">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={registerData.termsAccepted}
                      onChange={handleRegisterChange}
                      className="mr-2"
                    />
                    I agree to the{" "}
                    <span
                      onClick={() => setModalIsOpen(true)}
                      className="text-blue-600 underline ml-1 hover:text-blue-800 cursor-pointer"
                    >
                      Terms & Conditions
                    </span>
                  </label>
                  {errorMessages.terms && (
                    <div className="error-message mt-1">{errorMessages.terms}</div>
                  )}
                </div>
                <button type="submit">Register</button>
                <div className="register-link">
                  <p>
                    Already have an account? <a href="#" onClick={loginLink}>SignIn</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Terms & Conditions */}
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        className="bg-white p-6 rounded-lg max-w-3xl mx-auto my-16 outline-none max-h-[80vh] overflow-y-auto"
      >
        <TermsAndConditions onAgree={handleTermsAgree} />
      </Modal>
    </>
  );
};

export default LoginRegister;