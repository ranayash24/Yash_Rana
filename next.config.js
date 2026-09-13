/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/Yash_Vianychandra_Rana.pdf', destination: '/resume.pdf', permanent: true },
      { source: '/Yash_Rana_ML_RESUME_v3.pdf', destination: '/resume.pdf', permanent: true },
      { source: '/Yash_Rana_SD_RESUME.pdf', destination: '/resume.pdf', permanent: true },
    ]
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'sharp$': false,
      'onnxruntime-node$': false,
    }
    return config
  },
}

module.exports = nextConfig
