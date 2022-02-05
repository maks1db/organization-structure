import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'

interface CssLoadersProps {
    isDev?: boolean;
    enableCssModules?: boolean;
}

export const prepareBaseCssLoaders = (props?: CssLoadersProps) =>
    [
        props?.enableCssModules && {
            loader: 'css-loader',
            options: {
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                },
            },
        },
        !props?.enableCssModules && 'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        autoprefixer({
                            overrideBrowserslist: 'last 3 versions, > 1%',
                        }),
                        props?.isDev && cssnano,
                    ].filter(Boolean),
                },
            },
        },
    ].filter(Boolean);

const styleLoader = (isDev = true) =>
    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader);

export const useCss = (props: CssLoadersProps) => [
    styleLoader(props.isDev),
    ...prepareBaseCssLoaders(props),
];
export const useSass = (props: CssLoadersProps) => [
    styleLoader(props.isDev),
    ...prepareBaseCssLoaders(props),
    'sass-loader',
];
