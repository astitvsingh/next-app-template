"use client"; // Enables client-side rendering in Next.js app directory

// -------------------------------------
// External Dependencies
// -------------------------------------
import { useState } from "react"; // React hook to manage component-level state

// -------------------------------------
// Internal Module Imports
// -------------------------------------
import { register } from "../../lib/auth/register"; // Custom registration API function

/**
 * SignupPage Component
 *
 * This component renders a user signup form that allows users to
 * create an account by entering an email and password.
 * Upon form submission, it sends a registration request to the backend.
 *
 * @returns JSX.Element - A signup form component.
 */
function SignupPage() {
  // -------------------------------------
  // Local State Hooks
  // -------------------------------------
  const [email, setEmail] = useState(""); // Tracks the email input field value
  const [password, setPassword] = useState(""); // Tracks the password input field value

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

    try {
      // Attempts to register the user with backend auth API
      const data = await register(email, password);

      // Shows success message and logs returned data (e.g., token or user object)
      alert("Signup Success: " + JSON.stringify(data));
    } catch (error) {
      // Error handling for failed API request (network issues, email already exists, etc.)
      alert("Signup Failed: " + error);
    }
  };

  // -------------------------------------
  // Render JSX
  // -------------------------------------
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>

      {/* Email input field */}
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required // HTML validation
      />

      {/* Password input field */}
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required // HTML validation
      />

      {/* Submit button */}
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupPage;
