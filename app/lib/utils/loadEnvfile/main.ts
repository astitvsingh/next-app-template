// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

import dotenv from "dotenv";

function main(envPath: string): void {
  // Load the .env file
  const result = dotenv.config({ path: envPath, override: true });

  if (result.error) {
    console.error(`Failed to load .env file from ${envPath}:`, result.error);
  } else {
    console.log(`Loaded .env file from ${envPath}`);
  }
}

export { main };
