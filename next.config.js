module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    };

    return config;
  },
};
