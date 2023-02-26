import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelloWorld } from './components/HelloWorld';

import style from './App.module.css';

type Props = {
    appContext: any;
};

const Test = () => <div>{'Hello'}</div>;

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
                <Route path={'/min-app/'}>
                    <Route path={''} element={<HelloWorld />} />
                    <Route path={'test'} element={<Test />} />
                </Route>
            </Routes>
        </main>
    );
};
