import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

    return {
        plugins: [preact()],
        ssr: {
            // Dependencies containing React components must not be externalized
            // in order to work with preact/compat. This list must also include
            // any higher order dependencies.
            noExternal: ['@navikt/ds-react', '@navikt/ds-icons'],
        },
        base: process.env.APP_BASE_PATH,
        css: {
            modules: {
                // Create stable (but verbose!) classnames in dev mode
                // in order to support HMR
                ...(process.env.NODE_ENV === 'development' && {
                    generateScopedName: '[path][name]__[local]',
                }),
            },
        },
    };
});
