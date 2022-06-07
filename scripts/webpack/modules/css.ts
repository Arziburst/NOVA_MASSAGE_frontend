// Core
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

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
                test: /.s?css$/,
                use:  [

                    MiniCssExtractPlugin.loader,
                    loadCss({ sourceMap: false }),
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:      'css/[name].[contenthash:5].[id].css',
            chunkFilename: 'css/[name].[contenthash:5].[id].css',
        }),
    ],
});
