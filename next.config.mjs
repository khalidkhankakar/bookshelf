
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
            hostname: 'books.google.com',
          },
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname:  'firebasestorage.googleapis.com',
          },
          {
            protocol: 'https',
            hostname:  'i.gr-assets.com',
          },
          {
            protocol: 'https',
            hostname:  "images-na.ssl-images-amazon.com",
          },

        ],
      },
};

export default nextConfig;
