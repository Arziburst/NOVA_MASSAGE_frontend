// Core
import merge from 'webpack-merge';

// Configurations
import { getCommonConfig } from './webpack.common';

// Modules
import * as modules from '../modules';

export const getDevConfig = () => {
    console.log(process.env.NODE_ENV);

    return merge(
        getCommonConfig(),
        {
            mode:    'development',
            devtool: 'eval-cheap-module-source-map',
            stats:   'none',
        },
        modules.loadDevCss(),
    );
};
