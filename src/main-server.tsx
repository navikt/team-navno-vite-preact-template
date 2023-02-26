import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

export const render = (appContext: any) => {
    return renderToString(<App appContext={appContext} />);
};
