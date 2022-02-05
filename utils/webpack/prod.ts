import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';

import { useCss, useSass } from './utils';

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
    ],
} as Configuration;
