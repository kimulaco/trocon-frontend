const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: isProd ? { properties: ['^data-testid$'] } : false,
  },
}

module.exports = nextConfig
