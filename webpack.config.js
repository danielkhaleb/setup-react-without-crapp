const path = require('path');
const HtmlWP = require('html-webpack-plugin')
const PRODUCTION_ENV_VALUE = 'production';

const isDevEnv = process.env.NODE_ENV !== PRODUCTION_ENV_VALUE;

module.exports = {
    mode: isDevEnv ? 'development' : PRODUCTION_ENV_VALUE,
    devtool: isDevEnv ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        static: path.resolve(__dirname, 'public') // hot reload
    },
    plugins: [
        new HtmlWP({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevEnv && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    }
};