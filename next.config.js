/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  env: {
    API_SERVER: "http://localhost:8000/", // pulls from .env file
  },
  basePath: '/booking', // Adjust the base path according to your project structure
};

module.exports = nextConfig;