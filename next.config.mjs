/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "books.google.com",
          },
          {
            protocol: 'http',
            hostname: "books.google.com",
          },
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },

        ],
      },
};

export default nextConfig;
