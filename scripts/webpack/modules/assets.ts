// Core
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
// @ts-ignore
import FontminPlugin from 'fontmin-webpack';

// Constants
import { SOURCE_DIRECTORY, APP_NAME } from '../constants';

export const connectHtml = (): Configuration => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SOURCE_DIRECTORY}/index.handlebars`,
            title:    APP_NAME,
            favicon:  `${SOURCE_DIRECTORY}/favicon.ico`,
        }),
    ],
});

export const loadImagesDev = (): Configuration => ({
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
            },
        ],
    },
});

export const loadImagesProd = (): Configuration => ({
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                use:  [
                    {
                        loader:  ImageMinimizerPlugin.loader,
                        options: {
                            deleteOriginalAssets: true,
                            minimizerOptions:     {
                                plugins: [
                                    [ 'optipng', { optimizationLevel: 4, interlaced: null }],
                                    [ 'jpegtran', { progressive: true }],
                                    [ 'gifsicle', { optimizationLevel: 3, interlaced: false }],
                                    [ 'webp', { quality: 75 }],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
});

export const loadFontsDev = (): Configuration => ({
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
});

export const loadFontsProd = (): Configuration => ({
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new FontminPlugin({
            autodetect:        true,
            glyphs:            [],
            allowedFilesRegex: null,
            skippedFilesRegex: null,
        }),
    ],
});
