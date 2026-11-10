import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // اجازه دسترسی به منابع dev از دامنه پیش‌نمایش (فقط در حالت توسعه اثر دارد)
  allowedDevOrigins: ["*.e2b.app"],
};

export default nextConfig;
