import React from 'react';
import { Component } from './Component';

export const App = () => {
    return (
        <main role={'main'} id={'maincontent'} tabIndex={-1}>
            <Component />
        </main>
    );
};
