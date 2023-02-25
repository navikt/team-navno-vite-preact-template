import path from 'path';
import fs from 'fs';
import {
    injectDecoratorServerSide,
    Params,
} from '@navikt/nav-dekoratoren-moduler/ssr';

const decoratorEnv = process.env.ENV;
const decoratorLocalPort = 8100;

const envProps =
    decoratorEnv === 'localhost'
        ? {
              env: decoratorEnv,
              port: decoratorLocalPort,
          }
        : { env: decoratorEnv };

const templatePath =
    process.env.NODE_ENV === 'development'
        ? path.resolve(process.cwd(), '..', 'index.html')
        : path.resolve(process.cwd(), 'frontendDist', 'client', 'index.html');

const getUndecoratedTemplate = () =>
    fs.readFileSync(templatePath, { encoding: 'utf-8' });

const injectWithDecorator = async (
    params: Params,
    retries = 3
): Promise<string> => {
    try {
        return await injectDecoratorServerSide({
            ...params,
            ...envProps,
            filePath: templatePath,
        });
    } catch (e) {
        if (retries > 0) {
            // Use prod-decorator on localhost if the local decorator wasn't responding
            // Probably means the docker-compose network isn't running
            if (decoratorEnv === 'localhost') {
                console.log(
                    'Local decorator did not respond, using prod decorator'
                );
                return injectDecoratorServerSide({
                    ...params,
                    env: 'prod',
                    filePath: templatePath,
                });
            }

            return injectWithDecorator(params, retries - 1);
        }

        console.error(
            `Failed to fetch decorator, returning undecorated template - ${e}`
        );
        return getUndecoratedTemplate();
    }
};

const decoratorParams: Params = {
    context: 'privatperson',
    breadcrumbs: [
        {
            url: '/',
            title: 'Min app',
            handleInApp: true,
        },
    ],
};

export const getTemplateWithDecorator = async (params = decoratorParams) => {
    return injectWithDecorator(params);
};
