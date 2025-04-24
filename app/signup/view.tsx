// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React, { useState } from "react";
import Image from "next/image";

// -------------------------------------
// Internal Module Imports
// -------------------------------------
import { signup } from "@/app"; // Custom registration API function
import styles from "./styles.module.css"; // Import custom styles

function View(): React.JSX.Element {
  // -------------------------------------
  // Local State Hooks
  // -------------------------------------
  const [email, setEmail] = useState(""); // Tracks the email input field value
  const [password, setPassword] = useState(""); // Tracks the password input field value
  const [confirmPassword, setConfirmPassword] = useState(""); // Tracks the confirm password field value
  const [error, setError] = useState(""); // Tracks any error messages
  const [success, setSuccess] = useState(""); // Tracks success messages
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  // Password validation states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // Validate password on change
  const validatePassword = (value: string) => {
    setHasMinLength(value.length >= 8);
    setHasUpperCase(/[A-Z]/.test(value));
    setHasLowerCase(/[a-z]/.test(value));
    setHasNumber(/[0-9]/.test(value));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  /**
   * Handles form submission for signup
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   * @returns {Promise<void>}
   *
   * Sends a POST request to the auth server with email and password.
   * Displays success or failure messages via alert dialog.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages
    setIsLoading(true); // Set loading state

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password requirements
    if (
      !hasMinLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setError("Password does not meet all requirements");
      setIsLoading(false);
      return;
    }

    try {
      // Attempts to signup the user with backend auth API
      await signup(email, password);
      setSuccess(
        "Account created successfully! Please check your email to verify your account."
      );
      // You might want to redirect to login page here
    } catch (error) {
      // Error handling for failed API request (network issues, email already exists, etc.)
      setError(
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------
  // Render JSX
  // -------------------------------------
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/logo.png"
            alt="Company Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>

        {/* Form Title */}
        <h1 className={styles.formTitle}>Create Account</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={styles.inputGroup}>
            {/* Email input field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            {/* Password input field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={styles.input}
              />
            </div>

            {/* Confirm Password input field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className={styles.passwordRequirements}>
            <p className="text-sm font-medium text-gray-300 mb-2">
              Password Requirements:
            </p>
            <div className={styles.requirementItem}>
              <svg
                className={styles.requirementIcon}
                fill={hasMinLength ? "#10B981" : "#6B7280"}
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>At least 8 characters long</span>
            </div>
            <div className={styles.requirementItem}>
              <svg
                className={styles.requirementIcon}
                fill={hasUpperCase ? "#10B981" : "#6B7280"}
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>At least one uppercase letter</span>
            </div>
            <div className={styles.requirementItem}>
              <svg
                className={styles.requirementIcon}
                fill={hasLowerCase ? "#10B981" : "#6B7280"}
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>At least one lowercase letter</span>
            </div>
            <div className={styles.requirementItem}>
              <svg
                className={styles.requirementIcon}
                fill={hasNumber ? "#10B981" : "#6B7280"}
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>At least one number</span>
            </div>
            <div className={styles.requirementItem}>
              <svg
                className={styles.requirementIcon}
                fill={hasSpecialChar ? "#10B981" : "#6B7280"}
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>At least one special character</span>
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export { View };
