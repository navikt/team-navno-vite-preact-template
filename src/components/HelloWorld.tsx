import React from 'react';
import { Alert, BodyLong } from '@navikt/ds-react';

import style from './HelloWorld.module.css';

export const HelloWorld = () => {
    return (
        <Alert variant={'success'} className={style.hello}>
            <BodyLong>
                {'Hei! Jeg er en template app som benytter preact/compat for kompatibilitet med React kode. ' +
                    'Jeg er satt opp med støtte for NAVs designsystem-komponenter og NAV-dekoratøren. ' +
                    'Rammeverket mitt har en JS-bundle på ca 9KB.'}
            </BodyLong>
        </Alert>
    );
};
