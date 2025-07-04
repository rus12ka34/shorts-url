import htmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';
import webpack from 'webpack';

export function buildPlugins(options: BuildOptions): webpack.Configuration['plugins'] {
	const { paths, isDev } = options;
  const plugins: webpack.Configuration['plugins'] = [];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  plugins.push(new MiniCssExtractPlugin({
    filename: isDev ? "[name].css" : "[name].[contenthash].css",
    chunkFilename: isDev ? "[id].css" : "[id].[contenthash].css",
  }));
  plugins.push(new htmlWebpackPlugin({ title: 'Агрегатор', template: paths.html }));
  plugins.push(new webpack.DefinePlugin({
    __IS_DEV__: Boolean(isDev)
  }));
  plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));

	return plugins;
}
