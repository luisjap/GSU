/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/antravel',  destination: '/antravel/index.html', permanent: false },
      { source: '/antravel/', destination: '/antravel/index.html', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.thum.io' },
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: '**.up.railway.app' },
      { protocol: 'https', hostname: '**.railway.app' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};
module.exports = nextConfig;
