import React from 'react';
import { Alert, BodyLong, Link } from '@navikt/ds-react';

import style from './HelloWorld.module.css';

export const HelloWorld = () => {
    return (
        <Alert variant={'success'} className={style.hello}>
            <BodyLong>
                {'Hei! Jeg er en '}
                <Link href={'https://vitejs.dev/'}>{'vite'}</Link>
                {' + '}
                <Link href={'https://preactjs.com'}>{'preact'}</Link>
                {' template app som benytter preact/compat for kompatibilitet med React kode. ' +
                    'Jeg er satt opp med støtte for NAVs designsystem-komponenter og NAV-dekoratøren. ' +
                    'Rammeverket mitt har en JS-bundle på ca 9KB. ' +
                    'Jeg benytter server-side rendering med caching og er satt opp for deploy til nais.'}
            </BodyLong>
        </Alert>
    );
};
