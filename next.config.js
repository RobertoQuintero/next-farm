/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  // experimental:{
  //   serverActions:true
  // },
  reactStrictMode: false,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

module.exports = nextConfig
