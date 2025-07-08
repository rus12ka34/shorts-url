import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port ?? 4444,
		host: '0.0.0.0', // Необходимо для Docker
		open: true,
		historyApiFallback: true,
		hot: true
	};
}
