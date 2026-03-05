import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Required for GitHub Pages static export
  images: {
    unoptimized: true, // Required, as GitHub Pages doesn't support Next.js Image Optimization
  },

  // NOTE: If you deploy to https://<username>.github.io/<repo-name>/
  // you must uncomment the following line and replace '<repo-name>' with your repository name.
  // basePath: "/<repo-name>",
};

export default nextConfig;
