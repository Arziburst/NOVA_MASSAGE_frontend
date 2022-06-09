// Core
import {
    Configuration,
    DefinePlugin,
} from 'webpack';
import WebpackBar from 'webpackbar';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import dotenv from 'dotenv';

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
