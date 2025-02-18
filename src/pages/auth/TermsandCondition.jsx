import React, { useState } from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = ({ onAgree }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsAgreed(checked);
    if (checked) {
      // Wait 1 second before calling onAgree
      setTimeout(() => {
        onAgree(true);
      }, 1000); // 1000ms = 1 second
    }
  };

  return (
    <div className="text-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        BookIt! Terms & Conditions
      </h1>
      <div className="space-y-6">
        {/* Section 1: User Accounts & Responsibilities */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            1. User Accounts & Responsibilities
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Users must provide accurate details during registration.</li>
            <li>You are responsible for your account security and activities.</li>
            <li>
              Any misuse, fraudulent activity, or violation may lead to account suspension.
            </li>
          </ul>
        </section>

        {/* Section 2: Book Rentals & Purchases */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            2. Book Rentals & Purchases
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Books are available for both rental and purchase based on stock.</li>
            <li>Rental books must be returned on time to avoid late fees.</li>
            <li>Purchases are final unless the book is damaged or incorrect.</li>
          </ul>
        </section>

        {/* Section 3: Payments, Pricing & Discounts */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            3. Payments, Pricing & Discounts
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>All payments must be completed using BookIt!’s approved payment methods.</li>
            <li>Prices may change, and discounts are subject to availability and terms.</li>
            <li>Discounts cannot be combined unless stated otherwise.</li>
          </ul>
        </section>

        {/* Section 4: Cancellations & Refunds */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            4. Cancellations & Refunds
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Rental orders can be canceled before shipment but not after.</li>
            <li>
              Refunds are only allowed for damaged or incorrect books within 7 days.
            </li>
            <li>Refund processing times may vary depending on the payment method used.</li>
          </ul>
        </section>

        {/* Section 5: Notifications & Privacy */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            5. Notifications & Privacy
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Users agree to receive notifications regarding rentals, purchases, and offers.</li>
            <li>
              Personal data is collected as per our{" "}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </li>
            <li>BookIt! does not sell or share personal data without consent.</li>
          </ul>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            6. Limitation of Liability
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>
              BookIt! is not responsible for delays, stock issues, or indirect damages caused by third-party suppliers.
            </li>
            <li>Users are responsible for maintaining rented books in good condition.</li>
          </ul>
        </section>

        {/* Section 7: Changes to Terms & Contact Information */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            7. Changes to Terms & Contact Information
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>BookIt! reserves the right to update these terms at any time.</li>
            <li>Major changes will be notified via email or in-app alerts.</li>
            <li>
              For queries, contact us at{" "}
              <a href="mailto:support@bookit.com" className="text-blue-600 hover:underline">
                support@bookit.com
              </a>
              .
            </li>
          </ul>
        </section>

        {/* Last Updated */}
        <p className="text-xs text-gray-500 mt-4">
          Last Updated: February 25, 2025
        </p>

        {/* Checkbox */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              I have read and agreed to the Terms and Conditions
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;