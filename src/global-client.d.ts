declare global {
    interface ImportMeta {
        env: {
            VITE_APP_ORIGIN: string;
        };
        readonly hot?: ViteHotContext;
    }
}

export {};
