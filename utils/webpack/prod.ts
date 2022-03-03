import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { useCss, useSass } from './utils';

const shouldAnalyzeBundle = process.env.ANALYZE === 'true';

export default {
  output: {
    filename: 'assets/js/bundle.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: useCss({ enableCssModules: false, isDev: false }),
      },
      {
        test: /\.module.scss$/,
        use: useSass({ enableCssModules: true, isDev: false }),
      },
    ],
  },
  target: ['es5', 'web'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
    }),
    shouldAnalyzeBundle && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
} as Configuration;
