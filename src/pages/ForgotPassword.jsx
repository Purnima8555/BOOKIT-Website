import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa"; // Import icons

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNextStep = () => {
    setDirection(1);
    if (step < 3) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setDirection(-1);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-[#1E2751]">Forgot Password</h2>
          <p className="text-gray-600 text-sm mt-2">
            {step === 1 && "Enter your email to receive a verification code."}
            {step === 2 && "Enter the code sent to your email."}
            {step === 3 && "Set a new password for your account."}
          </p>
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
                </label>s
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-3xl focus:ring-1 focus:ring-[#1E2751] focus:border-[#1E2751] focus:outline-none pr-10"
                    placeholder="youremail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FaEnvelope className="absolute right-4 top-3.5 text-gray-500 text-lg" />
                </div>
                <button
                  className="w-full bg-[#1E2751] text-white py-2 text-lg font-semibold rounded-3xl mt-6 hover:bg-opacity-90 focus:ring-2 focus:ring-[#1E2751] transition"
                  onClick={handleNextStep}
                >
                  Send Code
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
                  />
                  <FaKey className="absolute right-4 top-3.5 text-gray-500 text-lg" />
                </div>
                <div className="flex justify-between items-center mt-6 space-x-4">
                  <button
                    className="w-1/2 bg-gray-300 text-gray-700 py-2 text-lg font-bold rounded-3xl hover:bg-gray-400 transition"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    className="w-1/2 bg-[#1E2751] text-white py-2 text-lg font-semibold rounded-3xl hover:bg-opacity-90 focus:ring-2 focus:ring-[#1E2751] transition"
                    onClick={handleNextStep}
                  >
                    Next
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
                  />
                  <FaLock className="absolute right-4 top-3.5 text-gray-500 text-lg" />
                </div>
                <div className="flex justify-between items-center mt-6 space-x-4">
                  <button
                    type="button"
                    className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-3xl hover:bg-gray-400 transition"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#1E2751] text-white py-2 rounded-3xl hover:bg-opacity-90 focus:ring-2 focus:ring-[#1E2751] transition"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ForgotPassword;
