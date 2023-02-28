import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';

const { BASE_URL } = import.meta.env;

export const render = (url: string, appContext: any) => {
    return renderToString(
        <StaticRouter basename={BASE_URL} location={url}>
            <App appContext={appContext} />
        </StaticRouter>
    );
};
