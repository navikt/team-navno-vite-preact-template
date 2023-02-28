declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'prod' | 'dev' | 'localhost';
            APP_BASE_PATH: string;
            APP_PORT: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {};
