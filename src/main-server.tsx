import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { App } from './App';

export const render = (url: string, appContext: any) => {
    console.log(url);

    return renderToString(
        <StaticRouter location={url}>
            <App appContext={appContext} />
        </StaticRouter>
    );
};
