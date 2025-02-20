import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNextStep = async () => {
    setError("");
    setLoading(true);

    try {
      if (step === 1) {
        await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
        setDirection(1);
        setStep(2);
      } else if (step === 2) {
        await axios.post("http://localhost:3000/api/auth/verify-code", { email, code: verificationCode });
        setDirection(1);
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousStep = () => {
    setDirection(-1);
    if (step > 1) setStep(step - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/auth/reset-password", {
        email,
        code: verificationCode,
        newPassword,
      });

      // Clear local storage
      localStorage.clear();

      // Show alert and navigate to loginRegister
      alert("Password reset successfully! Please log in with your new password.");
      navigate("/loginRegister");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-whitesmoke">
        <div className="main-container flex w-full max-w-screen-xl">
          <div className="image-container flex-1">
            <img
              src="/src/assets/images/login_bg.png"
              alt="Side Image"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="forgotpwd_container flex-2 items-center justify-center p-0">
            <div className="bg-white border rounded-2xl shadow-lg shadow-gray-400 p-8 mb-10 w-full max-w-md">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-[#1E2751] pt-5 px-6">Reset Password</h2>
                <p className="text-gray-500 text-sm mt-2">
                  {step === 1 && "Enter your email to receive a verification code."}
                  {step === 2 && "Enter the code sent to your email."}
                  {step === 3 && "Set a new password for your account."}
                </p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              {/* Animation Wrapper */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: direction * 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -direction * 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 ml-4">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-3xl focus:ring-1 focus:ring-[#1E2751] focus:border-[#1E2751] focus:outline-none pr-10"
                          placeholder="youremail@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                        />
                        <FaEnvelope className="absolute right-4 top-3.5 text-gray-500 text-lg" />
                      </div>
                      <button
                        className="w-full bg-[#1E2751] text-white py-2 text-lg font-semibold rounded-3xl mt-6 hover:bg-opacity-90 focus:ring-2 focus:ring-[#1E2751] transition disabled:opacity-50"
                        onClick={handleNextStep}
                        disabled={loading || !email}
                      >
                        {loading ? "Sending..." : "Send Code"}
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 ml-4">
                        Verification Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-3xl focus:ring-1 focus:ring-[#1E2751] focus:border-[#1E2751] focus:outline-none pr-10"
                          placeholder="Enter code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          disabled={loading}
                        />
                        <FaKey className="absolute right-4 top-3.5 text-gray-500 text-lg" />
                      </div>
                      <div className="flex justify-between items-center mt-6 space-x-4">
                        <button
                          className="w-1/2 bg-gray-300 text-gray-700 py-2 text-lg font-bold rounded-3xl hover:bg-gray-400 transition disabled:opacity-50"
                          onClick={handlePreviousStep}
                          disabled={loading}
                        >
                          Back
                        </button>
                        <button
                          className="w-1/2 bg-[#1E2751] text-white py-2 text-lg font-semibold rounded-3xl hover:bg-opacity-90 focus:ring-2 focus:ring-[#1E2751] transition disabled:opacity-50"
                          onClick={handleNextStep}
                          disabled={loading || !verificationCode}
                        >
                          {loading ? "Verifying..." : "Next"}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <form onSubmit={handleSubmit}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 ml-4">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-3xl focus:ring-1 focus:ring-[#1E2751] focus:border-[#1E2751] focus:outline-none pr-10"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          disabled={loading}
                        />
                        <FaLock className="absolute right-4 top-3.5 text-gray-500 text-lg" />
                      </div>
                      <div className="flex justify-between items-center mt-6 space-x-4">
                        <button
                          type="button"
                          className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-3xl hover:bg-gray-400 transition disabled:opacity-50"
                          onClick={handlePreviousStep}
                          disabled={loading}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-1/2 bg-[#1E2751] text-white py-2 rounded-3xl hover:bg-opacity-90 focus:ring-2 focus:ring-[#1E2751] transition disabled:opacity-50"
                          disabled={loading || !newPassword}
                        >
                          {loading ? "Resetting..." : "Reset"}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;