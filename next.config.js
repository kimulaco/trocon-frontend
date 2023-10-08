const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

/** @typedef {import('next').NextConfig NextConfig} */

/** @type {NextConfig} */
const nextConfigBase = {
  compiler: {
    reactRemoveProperties: isProd ? { properties: ['^data-testid$'] } : false,
  },
}

/** @type {NextConfig} */
const e2eCoverageConfig = {
  distDir: '.next_e2e',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: ['istanbul'],
        presets: ['next/babel'],
      },
    })
    return config
  },
}

module.exports = {
  ...nextConfigBase,
  ...(process.env.E2E_COVERAGE ? e2eCoverageConfig : {}),
}
