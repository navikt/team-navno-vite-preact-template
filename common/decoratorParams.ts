import { Params } from '@navikt/nav-dekoratoren-moduler';

export const getDecoratorParams = (): Params => ({
    context: 'privatperson',
    breadcrumbs: [
        {
            url: '/',
            title: 'Min app',
            handleInApp: true,
        },
    ],
});
