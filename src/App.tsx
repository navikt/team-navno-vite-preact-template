import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page1 } from './components/page1/Page1';
import { Page2 } from './components/page2/Page2';

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
            <Routes>
                <Route path={'/'} element={<Page1 />} />
                <Route path={'/page2'} element={<Page2 />} />
            </Routes>
        </main>
    );
};
