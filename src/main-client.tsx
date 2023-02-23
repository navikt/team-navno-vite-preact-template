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
    import.meta.hot.on('vite:beforeUpdate', (data: any) => {
        window.location.reload();
    });
}
