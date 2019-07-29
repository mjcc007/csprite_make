import path from 'path';
import webpack from 'webpack';
import WebpackBarPlugin from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const resolve = (...pathSegments: string[]) => path.resolve(process.cwd(), ...pathSegments);

type Options = { mode: 'development'; port: number } | { mode: 'production' };

export function createMainConfig(options: Options): webpack.Configuration {
  const __DEV__ = options.mode === 'development';
  return {
    entry: resolve('src/main/index.ts'),
    output: { path: resolve('app/main') },

    target: 'electron-main',
    mode: options.mode,
    node: false,
    devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',

    resolve: {
      extensions: ['.js', '.ts'],
      plugins: [new TsconfigPathsPlugin()],
    },

    plugins: [
      new CopyWebpackPlugin([{ from: resolve('src/main/assets'), to: 'assets' }]),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new WebpackBarPlugin({ name: 'Electron Main' }),
      new ForkTsCheckerWebpackPlugin({ formatter: 'codeframe' }),
      __DEV__ && new webpack.DefinePlugin({ 'process.env': { PORT: options['port'] } }),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.node$/,
          loader: 'native-ext-loader',
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          loader: `ts-loader?transpileOnly`,
        },
      ],
    },
  };
}

export function createRendererConfig(options: Options): webpack.Configuration {
  const __DEV__ = options.mode === 'development';
  return {
    entry: [
      __DEV__ && 'webpack/hot/dev-server',
      __DEV__ && `webpack-dev-server/client?http://localhost:${options['port']}`,
      resolve('src/renderer/index.tsx'),
    ].filter(Boolean),

    output: { path: resolve('app/renderer') },

    target: 'electron-renderer',
    mode: options.mode,
    node: false,
    devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',

    resolve: {
      alias: { 'react-dom': '@hot-loader/react-dom' },
      extensions: ['.js', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin()],
    },

    plugins: [
      !__DEV__ && new CopyWebpackPlugin([{ from: resolve('src/renderer/assets'), to: 'assets' }]),
      !__DEV__ && new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
      __DEV__ && new webpack.DefinePlugin({ 'process.env': { PORT: options['port'] } }),
      __DEV__ && new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({ title: null }),
      new WebpackBarPlugin({ name: 'Electron Renderer' }),
      new ForkTsCheckerWebpackPlugin({ formatter: 'codeframe' })
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          exclude: /\.module\.(css|scss|sass)$/,
          use: [!__DEV__ ? { loader: MiniCssExtractPlugin.loader as any } : 'style-loader', 'css-loader', 'sass-loader'].filter(Boolean),
        },
        {
          test: /\.module\.(css|scss|sass)$/,
          use: [
            !__DEV__ ? { loader: MiniCssExtractPlugin.loader as any } : 'style-loader',
            'css-loader?modules&localIdentName=[local]___[hash:base64:5]',
            'sass-loader',
          ].filter(Boolean),
        },
        {
          test: /\.svg$/,
          loader: '@svgr/webpack',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'fonts/[name]--[folder].[ext]'
            }
          }
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                babelrc: false,
                plugins: ['@babel/plugin-syntax-dynamic-import',
                  'react-hot-loader/babel',
                  ["import", {
                    "libraryName": "antd",
                    // "libraryDirectory": "lib",
                    "style": "css" // `style: true` 会加载 less 文件
                  }]],
              },
            },
            'ts-loader?transpileOnly',
          ],
        },
      ],
    },
  };
}

export function createDevServerConfig(options: { port: number }): webpack.Configuration['devServer'] {
  return {
    contentBase: [resolve('src/renderer')],
    inline: true,
    port: options.port,
    hot: true,
    clientLogLevel: 'error',
    overlay: true,
    quiet: true,
    historyApiFallback: true,
  };
}
