module.exports = {
  future: {
    webpack5: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    };

    return config;
  },
};
