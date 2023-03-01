import React from 'react';
import { Alert, BodyLong } from '@navikt/ds-react';
import { Link } from '../link/Link';

import style from './Page1.module.css';

export const Page1 = () => {
    return (
        <Alert variant={'success'} className={style.page1}>
            <BodyLong>
                {'Hei! Jeg er en '}
                <Link href={'https://vitejs.dev/'} external={true}>
                    {'vite'}
                </Link>
                {' + '}
                <Link href={'https://preactjs.com'} external={true}>
                    {'preact'}
                </Link>
                {' template app som benytter preact/compat for kompatibilitet med React kode. ' +
                    'Jeg er satt opp med støtte for NAVs designsystem-komponenter og NAV-dekoratøren. ' +
                    'Rammeverket mitt har en JS-bundle på ca 9KB. ' +
                    'Jeg benytter server-side rendering med caching og er satt opp for deploy til nais. '}
            </BodyLong>
            <Link href={'/page2'}>{'Gå til side 2.'}</Link>
        </Alert>
    );
};
