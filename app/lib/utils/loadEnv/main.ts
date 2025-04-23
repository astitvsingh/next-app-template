// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

import path from "path";
import { fileURLToPath } from "url";

// ------------------------------
// Internal Imports
// ------------------------------
import { loadEnvfile } from "@/app"; // Custom login function to authenticate user

function main(): void {
  // Get __dirname equivalent in ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Determine the environment (development, production, etc.)
  const env = process.env.NODE_ENV || "development";

  // Construct the path to the .env file in the .envs directory in the root
  const rootPath = path.resolve(__dirname, "../../"); // Adjust to point to the project root

  let envPath = path.join(rootPath, ".envs", `.env`);
  loadEnvfile(envPath);
  console.log(process.env.NEXT_PUBLIC_AUTH_SERVER);

  envPath = path.join(rootPath, ".envs", `.env.${env}.local`);
  loadEnvfile(envPath);
  console.log(process.env.NEXT_PUBLIC_AUTH_SERVER);

  envPath = path.join(rootPath, ".envs", `.env.local`);
  loadEnvfile(envPath);
  console.log(process.env.NEXT_PUBLIC_AUTH_SERVER);
}

export { main };
