import { BuildOptions } from './types/config';
import { Configuration } from 'webpack';
import path from 'path';

export function buildResolvers({ paths }: BuildOptions): Configuration['resolve'] {
	const { src } = paths;
	return {
		extensions: ['.tsx', '.ts', '.js'],
		preferAbsolute: true,
		modules: [src, 'node_modules'],
		mainFiles: ['index'],
		alias: {
			'@/app': path.resolve(src, '1-app'),
			'@/pages': path.resolve(src, '2-pages'),
			'@/widgets': path.resolve(src, '3-widgets'),
			'@/features': path.resolve(src, '4-features'),
			'@/entities': path.resolve(src, '5-entities'),
			'@/shared': path.resolve(src, '6-shared'),
		},
	};
}
