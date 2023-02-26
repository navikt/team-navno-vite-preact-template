import React from 'react';

import style from './App.module.css';

type Props = {
    appContext: any;
};

export const App = ({ appContext }: Props) => {
    console.log(`App context: ${JSON.stringify(appContext)}`);

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
