import { RequestHandler } from 'express';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';
import { decoratorEnvProps } from './decorator';
import { SELF } from 'csp-header';

const HMR_SERVER = 'ws://localhost:24678';

const myDirectives = {
    'script-src': [SELF],
    'script-src-elem': [SELF],
    'style-src': [SELF],
    ...(process.env.NODE_ENV === 'development' && {
        'connect-src': [HMR_SERVER],
    }),
};

export const createCspMiddleware = async (): Promise<RequestHandler> => {
    const csp = await buildCspHeader(myDirectives, decoratorEnvProps);

    return (req, res, next) => {
        res.setHeader('Content-Security-Policy', csp);
        next();
    };
};
