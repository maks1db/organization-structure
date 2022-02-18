import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import fs from 'fs';

const dir = process.cwd();

const getSrcAliasFolders = () =>
  fs
    .readdirSync(`${dir}/src`)
    .reduce(
      (acc, folder) => ({ ...acc, [folder]: `${dir}/src/${folder}` }),
      {}
    );

export default {
  entry: [`${dir}/src/app/index.tsx`],
  output: {
    filename: 'assets/js/bundle.js',
    path: `${dir}/public/`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: { ...getSrcAliasFolders() },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Организационная структура',
      template: 'src/app/template/index.html',
      filename: 'index.html',
    }),
    // new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(ts|tsx)$/,
      },
    ],
  },
} as Configuration;
