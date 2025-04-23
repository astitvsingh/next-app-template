/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Load environment variables from .envs
import { loadEnv } from "@/app";
loadEnv();

export default nextConfig;
