// Core
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const loadCss = ({ sourceMap }: { sourceMap: boolean }) => ({
    loader:  'css-loader',
    options: {
        sourceMap,
    },
});

export const loadDevCss = (): Configuration => ({
    module: {
        rules: [
            {
                test: /\.css|.scss|.sass$/,
                use:  [
                    'style-loader',
                    loadCss({ sourceMap: true }),
                    'sass-loader',
                ],
            },
        ],
    },
});

export const loadProdCss = (): Configuration => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    loadCss({ sourceMap: false }),
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:      'css/[name].[contenthash:5].[id].css',
            chunkFilename: 'css/[name].[contenthash:5].[id].css',
        }),
    ],
});
