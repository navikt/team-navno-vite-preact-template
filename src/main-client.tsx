// Import global style early to ensure the later component-level imports
// gets higher specificity
import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('app') as HTMLElement;
const shouldHydrate = rootElement.hasChildNodes() && import.meta.env.PROD;

if (shouldHydrate) {
    console.log('Hydrating!');
    ReactDOM.hydrateRoot(
        document.getElementById('app') as HTMLElement,
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.log('Rendering!');
    const root = ReactDOM.createRoot(
        document.getElementById('app') as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

if (import.meta.hot) {
    /*
     * Workaround for HMR not triggering module updates for some reason!
     * We do a full re-render of the component tree, which is at least
     * better than doing a full page reload -_-
     * */

    const { pathname } = new URL(import.meta.url);

    import.meta.hot.on('vite:beforeUpdate', (payload) => {
        console.log('Update payload: ', payload);
        if (!payload) {
            console.log('Payload is not defined');
            return;
        }

        const { type, updates } = payload;
        if (type !== 'update') {
            console.log(`Type is not update (${type})`);
            return;
        }

        if (!updates) {
            console.log('Updates are not defined');
            return;
        }

        updates.forEach((update) => {
            const { type, path, timestamp } = update;
            if (type !== 'js-update') {
                console.log(`Type is not js-update (${type})`);
                return;
            }

            console.log(`Updating for ${path}!`);
            import(/* @vite-ignore */ `${pathname}?t=${timestamp}`);
        });
    });
}
