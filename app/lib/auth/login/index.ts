/**
 * External dependency used to perform HTTP requests.
 * Axios is a promise-based HTTP client for the browser and Node.js.
 * It supports the Promise API that is native to JS ES6+.
 * @see {@link https://axios-http.com/docs/intro | Axios Documentation}
 */
import axios from "axios";


/**
 * Authenticates a user by making a POST request to the authentication server.
 *
 * This function uses `axios` to send a login request with the provided email and password.
 * The server URL is dynamically read from environment variables loaded via `dotenv`.
 *
 * @async
 * @function login
 * @param {string} email - The email address of the user trying to log in.
 * @param {string} password - The plaintext password of the user.
 * @returns {Promise<any>} Resolves to the response data returned by the authentication server.
 *
 * @throws Will throw an error if the HTTP request fails (e.g., server unavailable, invalid credentials).
 *
 * @example
 * ```ts
 * const email = "user@example.com";
 * const password = "secret123";
 * login(email, password)
 *   .then((data) => console.log("Login Successful", data))
 *   .catch((err) => console.error("Login Failed", err));
 * ```
 */
async function login(email: string, password: string): Promise<Response> {
  console.log(process.env.NODE_ENV);
  console.log("Auth server is:", process.env.NEXT_PUBLIC_AUTH_SERVER);

  // Makes a POST request to the authentication endpoint.
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_SERVER}/api/v1/auth/login`,
    {
      email, // Email field in request payload
      password, // Password field in request payload
    }
  );

  // Returns the data part of the response (i.e., user token or user object depending on API).
  return res.data;
}

/**
 * Exporting the login function as a named export so it can be imported elsewhere.
 *
 * @example
 * ```ts
 * import { login } from "./path/to/authModule";
 * ```
 */
export { login };
