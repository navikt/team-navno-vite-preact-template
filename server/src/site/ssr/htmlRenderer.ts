import { getTemplateWithDecorator } from './templateBuilder';
import { ViteDevServer } from 'vite';
import { render } from '../../../frontendDist/ssr/main-server';

export type HtmlRenderer = (url: string) => Promise<string>;

const processTemplate = async (templateHtml: string, appHtml: string) => {
    return templateHtml.replace('<!--ssr-app-html-->', appHtml);
};

export const prodRender: HtmlRenderer = async () => {
    const template = await getTemplateWithDecorator();
    const appHtml = render();
    return processTemplate(template, appHtml);
};

export const devRender =
    (vite: ViteDevServer): HtmlRenderer =>
    async (url) => {
        try {
            const template = await getTemplateWithDecorator();
            // SSR in Vite dev mode does not play nice with preact/compat and
            // external react modules. We'll make do with CSR + a somewhat subpar
            // HMR for now (see also main-client.tsx :D)
            // Run in production mode to use SSR locally
            // (or uncomment below and try to figure it out!)
            // const { render } = await vite.ssrLoadModule('/src/main-server.tsx');
            const appHtml = ''; // render();
            const html = await vite.transformIndexHtml(url, template);
            return processTemplate(html, appHtml);
        } catch (e) {
            vite.ssrFixStacktrace(e as Error);
            console.error(`Dev render error: ${e}`);
            throw e;
        }
    };
