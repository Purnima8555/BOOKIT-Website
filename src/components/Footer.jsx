import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons
import "./css/Footer.css";
import logo from "/src/assets/images/no_bg_logo.png"; // Path to your image file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Column: About BookIt with Image */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="BookIt Logo" className="footer-image" />
          </div>
          <h3>About BookIt!</h3>
          <p>
            BookIt! is your one-stop platform for renting, buying, and discovering books
            in a fun and easy way. We strive to make reading accessible and enjoyable for everyone.
          </p>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Browse Books</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Best Sellers</a></li>
          </ul>
        </div>

        {/* Right Column: Contact & Social Media */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@bookit.com</p>
          <p>Phone: 123-456-7890</p>

          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom: Legal Links */}
      <div className="footer-bottom">
        <p>&copy; 2024 BookIt! All Rights Reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </div>
    </footer>
  );
};

export default Footer;
