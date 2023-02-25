import React from 'react';

import style from './App.module.css';

export const App = () => {
    return (
        <main
            role={'main'}
            id={'maincontent'}
            tabIndex={-1}
            className={style.app}
        >
            <p>{'Hello world!'}</p>
        </main>
    );
};
