import webpack from 'webpack';
import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildPaths, EnvVariables } from './config/build/types/config';

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src'),
	};
	const mode = env.mode ?? 'development';
	const isDev = mode === 'development';
	const config: webpack.Configuration = buildWebpack({
		mode,
		isDev,
		port: env.port,
		paths,
	});
	return config;
};
