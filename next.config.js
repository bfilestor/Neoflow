/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    const extraIgnored = "System Volume Information|\\$RECYCLE\\.BIN";
    const currentIgnored = config.watchOptions?.ignored;
    const ignoreGlobs = [
      "**/System Volume Information",
      "**/System Volume Information/**",
      "**/$RECYCLE.BIN",
      "**/$RECYCLE.BIN/**",
    ];

    if (currentIgnored instanceof RegExp) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: new RegExp(`${currentIgnored.source}|${extraIgnored}`, currentIgnored.flags),
      };
    } else if (Array.isArray(currentIgnored)) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [...currentIgnored, ...ignoreGlobs],
      };
    } else if (typeof currentIgnored === "string" && currentIgnored.length > 0) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [currentIgnored, ...ignoreGlobs],
      };
    } else {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ignoreGlobs,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
