// imports
import adapter from '@sveltejs/adapter-node';
import path from 'path';
import preprocess from 'svelte-preprocess';
import vitePluginSocketIo from 'vite-plugin-socket-io';
import { serverEvents, socketEvents } from './src/lib/socketio/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      entryPoint: ['./server.js'],
      env: {
        port: process.env.PORT | 3000,
        host: '0.0.0.0'
      }
    }),
    target: '#svelte',
    vite: {
      plugins: [vitePluginSocketIo({ serverEvents, socketEvents })],
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
