// Core
import {
    Configuration,
    DefinePlugin,
    ProvidePlugin,
    HotModuleReplacementPlugin,
} from 'webpack';
import WebpackBar from 'webpackbar';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import dotenv from 'dotenv';
import { extname } from 'path';
import fs from 'fs';
import ttf2woff2 from 'ttf2woff2';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

// Constants
import { BUILD_ASSETS_DIRECTORY } from '../constants';

export const connectBuildProgressIndicator = (): Configuration => ({
    plugins: [ new WebpackBar({ basic: true }) ],
});

export const connectBundleAnalyzer = (): Configuration => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            openAnalyzer:      false,
            generateStatsFile: true,
        }),
    ],
});

export const defineEnvVariables = (): Configuration => {
    const envFileFinder = (path: string): string => {
        return JSON.stringify(dotenv.config({ path }).parsed) ?? envFileFinder('.env.example');
    };

    const environmentHandler = () => {
        switch (process?.env?.NODE_ENV) {
            case 'development': return envFileFinder('.env.development');
            case 'production': return envFileFinder('.env.production');
            default: return envFileFinder('.env.example');
        }
    };

    return {
        plugins: [
            new DefinePlugin({
                'process.env': environmentHandler(),
            }),
        ],
    };
};

export const provideGlobals = (): Configuration => ({
    plugins: [
        new ProvidePlugin({
            React: 'react',
        }),
    ],
});

export const webpackShellProd = (): Configuration => {
    const convertFonts = () => {
        fs.stat(BUILD_ASSETS_DIRECTORY, (error) => {
            if (!error) {
                const files = fs.readdirSync(BUILD_ASSETS_DIRECTORY);

                files.forEach((file) => {
                    if (extname(file) === '.ttf') {
                        const fullFilename = `${BUILD_ASSETS_DIRECTORY}/${file}`;
                        const buffer = fs.readFileSync(fullFilename);

                        fs.writeFileSync(fullFilename, ttf2woff2(buffer));
                    }
                });
            }
        });
    };

    return {
        plugins: [
            new WebpackShellPluginNext({
                onAfterDone: () => convertFonts(),
            }),
        ],
    };
};
