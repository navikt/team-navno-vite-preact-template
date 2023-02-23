import { getTemplateWithDecorator } from './templateBuilder';
import { ViteDevServer } from 'vite';
import { render } from '../../../frontendDist/ssr/main-server.js';

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
            // SSR with Vite dev mode does not play nice with preact/compat and
            // certain react modules. We use CSR for now
            // Uncomment or run in production mode to use SSR locally
            const { render } = await vite.ssrLoadModule('/src/main-server.tsx');
            const appHtml = await render();
            console.log(appHtml);
            const html = await vite.transformIndexHtml(url, template);
            return processTemplate(html, appHtml);
        } catch (e) {
            vite.ssrFixStacktrace(e as Error);
            console.error(e);
            throw e;
        }
    };
