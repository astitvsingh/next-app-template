// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

/**
 * External dependency used to perform HTTP requests.
 * Axios is a promise-based HTTP client for the browser and Node.js.
 * It supports the Promise API that is native to JS ES6+.
 * @see {@link https://axios-http.com/docs/intro | Axios Documentation}
 */
import axios from "axios";

/**
 * Registers a new user by sending a POST request to the authentication server.
 *
 * This function leverages `axios` to send user credentials to the backend
 * registration endpoint. The backend URL is read from an environment variable
 * to support different deployment environments (dev, staging, prod).
 *
 * @async
 * @function register
 * @param {string} email - The email address of the new user.
 * @param {string} password - The plaintext password for the new user.
 * @returns {Promise<Response>} Resolves to the response data from the auth server (e.g., token, user object).
 *
 * @throws Will throw an error if the HTTP request fails due to network issues,
 *         invalid payload, or if the backend returns an error status.
 *
 * @example
 * ```ts
 * const user = await register("user@example.com", "securePassword123");
 * console.log(user); // { token: "...", user: { ... } }
 * ```
 */
async function main(email: string, password: string): Promise<Response> {
  // Make a POST request to the registration endpoint
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_SERVER}/api/v1/auth/register`, // Auth server base URL from environment
    {
      email, // Email included in request body
      password, // Password included in request body
    }
  );

  // Return only the `data` portion of the HTTP response (e.g., token or user object)
  return response.data;
}

/**
 * Exporting the main function as a named export so it can be imported elsewhere.
 *
 * @example
 * ```ts
 * import { main } from "./path/to/authModule";
 * ```
 */
export { main };
