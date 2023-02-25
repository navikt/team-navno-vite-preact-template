import React from 'react';
import { Alert } from '@navikt/ds-react';

import style from './Component.module.css';

export const Component = () => {
    return (
        <Alert variant={'warning'} size={'medium'} className={style.mystyle}>
            {'Hei 164'}
        </Alert>
    );
};
