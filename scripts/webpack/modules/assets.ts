// Core
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Constants
import { STATIC_DIRECTORY, APP_NAME } from '../constants';

export const connectHtml = (): Configuration => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: `${STATIC_DIRECTORY}/main.ejs`,
            title:    APP_NAME,
            favicon:  `${STATIC_DIRECTORY}/favicon.ico`,
            chunks:   [ 'main' ],
        }),
    ],
});
