import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	// resolve: {
	// 	alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
	// },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		
	},
	server:{
		port: 3000,
		host: '0.0.0.0',
	},
	plugins: [react()]
});
// , tsconfigPaths()
// , test 1
// , test 2
// , test 3