import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter:
            process.env.DEPLOY_TARGET === 'node' ? adapterNode({ out: 'build' }) : adapterVercel()
    }
};

export default config;
