import React from 'react';
import { Component } from './Component';

import style from './App.module.css';

export const App = () => {
    return (
        <main
            role={'main'}
            id={'maincontent'}
            tabIndex={-1}
            className={style.app}
        >
            <Component />
        </main>
    );
};
