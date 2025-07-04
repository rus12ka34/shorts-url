export interface BuildPaths {
	entry: string;
	html: string;
	output: string;
	src: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
	port: number;
	isDev: boolean;
	mode: BuildMode;
	paths: BuildPaths;
}

export interface EnvVariables {
	mode: BuildMode;
	port: number;
}
