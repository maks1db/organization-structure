import { Configuration } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { useCss, useSass } from './utils';

export default {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: useCss({ enableCssModules: false, isDev: true }),
            },
            
            {
                test: /\.module.scss$/,
                use: useSass({ enableCssModules: true, isDev: true }),
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
} as Configuration;
