// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

import path from "path";
import { fileURLToPath } from "url";

// ------------------------------
// Internal Imports
// ------------------------------
import { loadEnvfile } from "../loadEnvfile"; // Custom login function to authenticate user

function main(): void {
  // Get __dirname equivalent in ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Determine the environment (development, production, etc.)
  const env = process.env.NODE_ENV || "development";

  // Construct the path to the .env file in the .envs directory in the root
  const rootPath = path.resolve(__dirname, "../../../../"); // Adjust to point to the project root

  let envPath = path.join(rootPath, ".envs", `.env`);
  loadEnvfile(envPath);

  envPath = path.join(rootPath, ".envs", `.env.${env}.local`);
  loadEnvfile(envPath);

  envPath = path.join(rootPath, ".envs", `.env.local`);
  loadEnvfile(envPath);
}

export { main };
