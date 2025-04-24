// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
// ------------------------------
// React & External Dependencies
// ------------------------------
import React, { useState } from "react"; // React hook for managing local component state
import Image from "next/image"; // Next.js Image component for optimized images

// ------------------------------
// Internal Imports
// ------------------------------
import { signin } from "@/app"; // Custom signin function to authenticate user
import styles from "./styles.module.css"; // Import custom styles

/**
 * SigninPage Component
 *
 * Renders a beautiful signin form for users to input their email and password.
 * On submission, it invokes the `signin` function from the auth module
 * and handles the authentication response.
 *
 * @returns JSX.Element - A styled signin form UI with inputs and a submit button.
 */
function View(): React.JSX.Element {
  // ------------------------------
  // Local State Hooks
  // ------------------------------
  const [email, setEmail] = useState(""); // Stores the email input value
  const [password, setPassword] = useState(""); // Stores the password input value
  const [error, setError] = useState(""); // Stores any error messages
  const [success, setSuccess] = useState(""); // Stores success messages
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

  /**
   * Handles the form submission event.
   *
   * Prevents default page refresh, sends signin request to server,
   * and shows the server response in an alert dialog.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form action (page reload)
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages
    setIsLoading(true); // Set loading state

    try {
      await signin(email, password); // Call signin API with email and password
      setSuccess("Successfully signed in! Welcome back!"); // Show success message
      // You might want to redirect or update the UI here
    } catch (error) {
      // Handle error from signin API (e.g., invalid credentials, network error)
      console.error("Signin failed:", error);
      setError("Invalid email or password. Please try again."); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // ------------------------------
  // JSX Markup
  // ------------------------------
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
        <h1 className={styles.formTitle}>Welcome Back</h1>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Sign up
              </a>
            </p>
            <a
              href="/forgot-password"
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export { View };
