// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
// ------------------------------
// React & External Dependencies
// ------------------------------
import React, { useState } from "react"; // React hook for managing local component state

// ------------------------------
// Internal Imports
// ------------------------------
import { login } from "@/app"; // Custom login function to authenticate user

/**
 * LoginPage Component
 *
 * Renders a login form for users to input their email and password.
 * On submission, it invokes the `login` function from the auth module
 * and handles the authentication response.
 *
 * @returns JSX.Element - A login form UI with two inputs and a submit button.
 */
function View(): React.JSX.Element {
  // ------------------------------
  // Local State Hooks
  // ------------------------------
  const [email, setEmail] = useState(""); // Stores the email input value
  const [password, setPassword] = useState(""); // Stores the password input value

  /**
   * Handles the form submission event.
   *
   * Prevents default page refresh, sends login request to server,
   * and shows the server response in an alert dialog.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form action (page reload)

    try {
      const result = await login(email, password); // Call login API with email and password
      alert(JSON.stringify(result)); // Display the result in a dialog box (e.g., token or user data)
    } catch (error) {
      // Handle error from login API (e.g., invalid credentials, network error)
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  // ------------------------------
  // JSX Markup
  // ------------------------------
  return (
    <form onSubmit={handleSubmit}>
      {/* Email input field */}
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
}

export { View };
