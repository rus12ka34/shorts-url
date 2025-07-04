import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/config';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export function buildLoaders({ isDev }: BuildOptions): ModuleOptions['rules'] {

	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
        loader: "css-loader",
        options: {
					modules: {
            auto: /\.modules\.\w+$/i,
            localIdentName: isDev ? "[path][name]__[local]--[hash:base64:8]" : "[hash:base64:8]",
          },
        },
      },
			"sass-loader",
		],
	};

	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const fileLoader = {
		test: /\.(png|jpe?g|gif)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	return [fileLoader, svgLoader, tsLoader, cssLoader];
}
