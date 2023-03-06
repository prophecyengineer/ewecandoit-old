/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['wikimedia.org', 'upload.wikimedia.org', '2ality.com', 'upload.wikimedia.org', 'www.unosquare.com', 'pbs.twimg.com', 'e7.pngegg.com', 'seeklogo.com', 'lavca.org', 'dashboard.snapcraft.io', 'worldvectorlogo.com']
  }
}

module.exports = nextConfig
