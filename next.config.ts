import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets the dev server (HMR, etc.) be reached from other devices on the
  // LAN for mobile testing, e.g. http://192.168.1.6:3000. Dev-only — has no
  // effect on the production build.
  allowedDevOrigins: ["192.168.1.6"],
};

export default nextConfig;
