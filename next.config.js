/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig
