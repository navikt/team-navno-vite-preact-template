// Import global style early to ensure the later component-level imports
// gets higher specificity
import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.hydrateRoot(
    document.getElementById('app') as HTMLElement,
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', (data) => {
        console.log('Before update', data);
        console.log('Before data', import.meta.hot?.data);
        // window.location.reload();
        // const module = document.createElement('script');
        // module.type = 'module';
        // module.src = `/min-app/src/main-client.tsx?t=${Date.now()}`;
        // document.body.append(module);
        if (!data) {
            console.log('Undefined data');
            return;
        }

        const { type, updates } = data;

        if (type !== 'update') {
            console.log(`Type is ${type}`);
            return;
        }

        if (!updates) {
            console.log('Updates not defined');
            return;
        }

        updates.forEach((update) => {
            const { type, path, timestamp } = update;
            if (type !== 'js-update') {
                console.log(`Type is ${type}`);
                return;
            }

            const modulePath = `${import.meta.env.BASE_URL}${path}`;

            console.log(`Updating ${modulePath}`);

            import(/* @vite-ignore */ `${modulePath}?t=${Date.now()}`);
        });
    });
    import.meta.hot.on('vite:afterUpdate', (data: any) => {
        console.log('After update', data);
        console.log('After data', import.meta.hot?.data);
    });
    import.meta.hot.on('vite:beforeFullReload', () => {
        console.log('FULL RELOAD');
    });
}
