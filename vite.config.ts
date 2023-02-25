import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        plugins: [preact()],
        ssr: {
            // React modules from node_modules must not be externalized
            // in order to work with preact/compat
            noExternal: ['@navikt/ds-react'],
        },
        base: process.env.APP_BASE_PATH,
        css: {
            modules: {
                // Create stable (but verbose) classnames in dev mode
                // in order to support HMR
                ...(process.env.NODE_ENV === 'development' && {
                    generateScopedName: '[path][name]__[local]',
                }),
            },
        },
    };
});
