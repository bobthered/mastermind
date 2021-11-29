// imports
import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import preprocess from 'svelte-preprocess';
import vitePluginSocketIo from 'vite-plugin-socket-io';
import { socketEvents } from './src/socketio/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    target: '#svelte',
    vite: {
      plugins: [vitePluginSocketIo({ socketEvents })],
      resolve: {
        alias: {
          $components: path.resolve('./src/components'),
          $lib: path.resolve('./src/lib'),
          $stores: path.resolve('./src/stores')
        }
      }
    }
  },
  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};

export default config;
